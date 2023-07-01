const Home = () => {
    return (<div className="container">
        <div>
            <p className="my-3 fs-4">Yêu cầu:</p>
            <hr />
            <div>
                Sử dụng API từ trang web https://reqres.in để tạo website.
            </div>
            <div>
                Sử dụng thưu viện React để tạo một màn hình website cơ bản gồm các chức năng:
            </div>
        </div>
        <ul>
            <li>1. Đăng nhập</li>
            <li>2. Đăng xuất</li>
            <li>3. Thêm user</li>
            <li>4. Sửa user</li>
            <li>5. Xóa user</li>
            <li>6. Hiển thị tất cả users</li>
            <li>7. Tìm kiếm users theo First name</li>
            <li>8. Sắp xếp theo Id</li>
            <li>9. Import users từ file.csv</li>
            <li>10. EXport users từ file.csv</li>
        </ul>
        <hr />
        <div>Tự do tùy chỉnh html, css để có một website nhẹ nhàng, khoa học và đẹp.</div>
        <div>Commit và đẩy source code lên github public.</div>
        <div>Triển khai website demo.</div>
    </div>);
}

export default Home;