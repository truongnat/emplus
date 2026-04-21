import postgres from "postgres";
import { hashPassword } from "../utils/password.ts";
import { env } from "../config/env.ts";

async function run() {
    if (!env.databaseUrl) {
        console.error("Missing DATABASE_URL");
        process.exit(1);
    }

    const sql = postgres(env.databaseUrl, { max: 1 });

    try {
        console.log("Seeding custom users...");

        // 1. Create or Update User 1
        const user1Email = "truongdq.dev@gmail.com";
        const user1Password = "12345678";
        const user1Hash = hashPassword(user1Password);

        const [user1] = await sql`
      INSERT INTO users (
        id, email, full_name, nickname, gender, auth_provider, auth_id, password_hash, is_active
      ) VALUES (
        ${crypto.randomUUID()}, ${user1Email}, 'Truong DQ', 'Truong', 'NAM', 'LOCAL', ${user1Email}, ${user1Hash}, true
      )
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        gender = 'NAM',
        is_active = true
      RETURNING id
    `;

        // 2. Create or Update User 2
        const user2Email = "ptttrang2k@gmail.com";
        const user2Password = "12345678";
        const user2Hash = hashPassword(user2Password);

        const [user2] = await sql`
      INSERT INTO users (
        id, email, full_name, nickname, gender, auth_provider, auth_id, password_hash, is_active
      ) VALUES (
        ${crypto.randomUUID()}, ${user2Email}, 'Trang PTT', 'Trang', 'NU', 'LOCAL', ${user2Email}, ${user2Hash}, true
      )
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        gender = 'NU',
        is_active = true
      RETURNING id
    `;

        console.log(`Users logic done: ${user1.id}, ${user2.id}`);

        // 3. Ensure Couple
        const [existingCouple] = await sql`
      SELECT id FROM couples 
      WHERE (partner_1_id = ${user1.id} AND partner_2_id = ${user2.id})
         OR (partner_1_id = ${user2.id} AND partner_2_id = ${user1.id})
    `;

        let coupleId;
        if (existingCouple) {
            coupleId = existingCouple.id;
            await sql`
        UPDATE couples SET status = 'DATING', love_start_date = NOW() - INTERVAL '1 year'
        WHERE id = ${coupleId}
      `;
        } else {
            coupleId = crypto.randomUUID();
            await sql`
        INSERT INTO couples (
          id, partner_1_id, partner_2_id, status, love_start_date
        ) VALUES (
          ${coupleId}, ${user1.id}, ${user2.id}, 'DATING', NOW() - INTERVAL '1 year'
        )
      `;
        }

        console.log(`Pairing complete: Couple ID ${coupleId}`);
        console.log(`Email 1: ${user1Email} / 12345678`);
        console.log(`Email 2: ${user2Email} / 12345678`);

    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    } finally {
        await sql.end();
    }
}

run();
