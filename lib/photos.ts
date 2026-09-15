import { Client } from "@notionhq/client";

export type Photo = { src: string; caption: string; width?: number; height?: number };
export type Post = { id: string; title: string; date: string; note: string; photos: Photo[] };

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_PHOTOS_DB;

/** Plain text out of a Notion rich-text array. */
function plain(rich: any[] | undefined): string {
  return (rich || []).map((t) => t.plain_text).join("").trim();
}

/** Every image block on a Notion page, in order, with its caption. */
async function photosOf(notion: Client, pageId: string): Promise<Photo[]> {
  const photos: Photo[] = [];
  let cursor: string | undefined;

  do {
    const res: any = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor, page_size: 100 });
    for (const block of res.results) {
      if (block.type !== "image") continue;
      const img = block.image;
      const src = img.type === "external" ? img.external.url : img.file.url;
      if (src) photos.push({ src, caption: plain(img.caption) });
    }
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return photos;
}

/**
 * Posts newest first. Returns [] when Notion isn't configured so the site
 * still builds and renders without the integration.
 */
export async function getPosts(): Promise<Post[]> {
  if (!token || !databaseId) return [];

  const notion = new Client({ auth: token });

  const query = {
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" as const }],
  };

  let rows: any[] = [];
  try {
    // Notion's 2025 API queries a data source, which a database contains.
    const db: any = await notion.databases.retrieve({ database_id: databaseId });
    const dataSourceId = db.data_sources?.[0]?.id;
    const res: any = dataSourceId
      ? await notion.dataSources.query({ data_source_id: dataSourceId, ...query })
      : await (notion as any).databases.query({ database_id: databaseId, ...query });
    rows = res.results;
  } catch (err) {
    console.error("[photos] Notion query failed:", err);
    return [];
  }

  const posts = await Promise.all(
    rows.map(async (row: any) => {
      const props = row.properties;
      return {
        id: row.id,
        title: plain(props.Title?.title) || "Untitled",
        date: props.Date?.date?.start || "",
        note: plain(props.Note?.rich_text),
        photos: await photosOf(notion, row.id),
      };
    })
  );

  return posts.filter((p) => p.photos.length > 0);
}
