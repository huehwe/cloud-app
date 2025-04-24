import sql from "mssql";

const config = {
  user: "sqladmin",
  password: "Cloud12345",
  server: "cloud-server-is402p21.database.windows.net",
  database: "cloud-db",
  options: {
    encrypt: true, // Sử dụng mã hóa cho Azure SQL
  },
};

const quickTest = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Database connected successfully!");

    // Tạo một user test
    const result = await pool.request()
      .input("name", sql.VarChar, "Quick Test User")
      .input("email", sql.VarChar, "quicktest@example.com")
      .input("password_hash", sql.VarChar, "quickpassword123")
      .input("role", sql.VarChar, "user") // Thêm giá trị cho cột role
      .query(
        "INSERT INTO Users (name, email, password_hash, role) VALUES (@name, @email, @password_hash, @role)"
      );

    console.log("Test user created:", result);
  } catch (error) {
    console.error("Error during quick test:", error);
  } finally {
    sql.close(); // Đóng kết nối
    process.exit(0);
  }
};

quickTest();