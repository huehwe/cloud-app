import sql from 'mssql';

const config = {
  user: 'your_db_username', // Thay bằng tên người dùng của bạn
  password: 'your_db_password', // Thay bằng mật khẩu của bạn
  server: 'your_db_server', // Thay bằng địa chỉ server (ví dụ: localhost hoặc IP)
  database: 'your_database_name', // Thay bằng tên cơ sở dữ liệu
  options: {
    encrypt: true, // Nếu sử dụng Azure SQL, cần bật encrypt
    trustServerCertificate: true, // Nếu chạy cục bộ, có thể cần bật tùy chọn này
  },
};

const testInsertUser = async () => {
  try {
    // Kết nối đến cơ sở dữ liệu
    const pool = await sql.connect(config);

    // Thêm một dòng vào bảng Users
    const result = await pool.request()
      .input('name', sql.NVarChar(100), 'Test User')
      .input('email', sql.NVarChar(100), 'testuser@example.com')
      .input('password_hash', sql.NVarChar(sql.MAX), 'hashed_password')
      .input('role', sql.VarChar(20), 'customer')
      .query(`
        INSERT INTO Users (name, email, password_hash, role)
        VALUES (@name, @email, @password_hash, @role)
      `);

    console.log('User inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    // Đóng kết nối
    sql.close();
  }
};

testInsertUser();