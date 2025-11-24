import pool from "@/lib/pgsql";

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT count FROM visitor_count WHERE id = 1"
    );
    return Response.json({ count: rows[0].count });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const update = await pool.query(
      "UPDATE visitor_count SET count = count + 1 WHERE id = 1 RETURNING count"
    );
    return Response.json({ count: update.rows[0].count });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
