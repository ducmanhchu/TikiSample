import Footer from '../components/Footer';
import Header from '../components/Header';
import bookApi from '../api/book';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function BookAdminDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); // Dùng navigate để điều hướng
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');

    // Khởi tạo state để lưu thông tin cập nhật sách
    const [formData, setFormData] = useState({
        images: [],
        name: '',
        author: '',
        description: '',
        short_description: '',
        price: '',
        original_price: 0,
        percent: 0,
        quantity_sold: 0,
        quantity_in_stock: 0,
        rating_average: 0,
        book_cover: '',
        loai_bia: '',
        isbn13: '',
        dich_gia: '',
        publisher_vn: '',
        publication_date: '',
        edition: '',
        dimensions: '',
        number_of_page: 0,
        categories: '',
        current_seller: ''
    });

    // Lấy thông tin sách từ API khi component được mount
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookDetail = await bookApi.getDetailBook(id);
                setBook(bookDetail);
                console.log('book', bookDetail)
                bookDetail.description = bookDetail.description.replace(/<\/?[^>]+(>|$)/g, '');

                setFormData({
                    ...formData,
                    images: bookDetail.images,
                    name: bookDetail.name ,
                    author: bookDetail.author ,
                    description: bookDetail.description,
                    short_description: bookDetail.short_description,
                    price: bookDetail.price,
                    original_price: bookDetail.original_price,
                    percent: bookDetail.percent,
                    quantity_sold: bookDetail.quantity_sold,
                    quantity_in_stock: bookDetail.quantity_in_stock,
                    rating_average: bookDetail.rating_average,
                    book_cover: bookDetail.book_cover,
                    loai_bia: bookDetail.loai_bia,
                    isbn13: bookDetail.isbn13,
                    dich_gia: bookDetail.dich_gia,
                    publisher_vn: bookDetail.publisher_vn,
                    publication_date: bookDetail.publication_date,
                    edition: bookDetail.edition,
                    dimensions: bookDetail.dimensions,
                    number_of_page: bookDetail.number_of_page,
                    categories: bookDetail.categories.name,
                    current_seller: bookDetail.current_seller.name 
                });
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sách:', error);
                setError('Không thể lấy dữ liệu sách.');
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleBackClick = () => {
        navigate('/ad'); // Điều hướng về trang listbooks
    };

    const handleUpdateBook = async () => {
        try {
            // Gọi API để cập nhật thông tin sách
            await bookApi.updateBook(id, formData);
            alert('Cập nhật sách thành công');
            // setIsEditing(true); // Đặt lại trạng thái chỉnh sửa sau khi cập nhật thành công
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin sách:', error);
            alert('Cập nhật sách thất bại');
        }
    };

    return( <>
        <Header/>
        {book && (
        <div className="container bg-white mt-3">
            <div className="row p-2 ">
            <div className="col-md-4">
                    <img src={formData.images[0]['base_url']} style={{width:"20%"}}></img>
                    <h3 className="mt-3">Ảnh </h3>
                    <div className="form-group mb-3">
                            <label htmlFor="base_url">Base_url</label>
                            <input
                                type="url"
                                className="form-control"
                                id="base_url"
                                value={formData.images[0]['base_url']}
                                onChange={handleChange}
                                required
                            />
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="large_url">Large_url</label>
                            <input
                                type="url"
                                className="form-control"
                                id="large_url"
                                value={formData.images[0]['large_url']}
                                onChange={handleChange}
                            />
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="medium_url">Medium_url</label>
                            <input
                                type="url"
                                className="form-control"
                                id="medium_url"
                                value={formData.images[0]['medium_url']}
                                onChange={handleChange}
                                required
                            />
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="small_url">Small_url</label>
                            <input
                                type="url"
                                className="form-control"
                                id="small_url"
                                value={formData.images[0]['small_url']}
                                onChange={handleChange}
                                required
                            />
                    </div>
                </div>
                <div className="col-md-8">
                    <h3>Chỉnh sửa thông tin sách</h3>
                    <form className="needs-validation d-flex flex-wrap justify-content-between mt-3" noValidate>
                        <div className="form-group col-md-6 mb-3">
                                <label htmlFor="name">Tên sách</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="author">Tên tác giả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-1">
                                <label htmlFor="id">ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    value={id}
                                    readOnly
                                />
                        </div>
                        <div className="form-group col-md-12 h-100 mb-3">
                            <label htmlFor="description">Mô tả sách*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-12 mb-3">
                                <label htmlFor="short_description">Tóm tắt nội dung sách*</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="short_description"
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                                <label htmlFor="price">Giá bán</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name='price'
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="original_price">Giá gốc</label>
                            <input
                                type="number"
                                className="form-control"
                                id="original_price"
                                name='original_price'
                                value={formData.original_price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="percent">Phần trăm</label>
                            <input
                                type="number"
                                className="form-control"
                                id="percent"
                                name='percent'
                                value={formData.percent}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label htmlFor="quantity_sold">Số lượng đã bán* </label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity_sold"
                                name='quantity_sold'
                                value={formData.quantity_sold}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="quantity_in_stock">Số lượng trong kho* </label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity_in_stock"
                                name='quantity_in_stock'
                                value={formData.quantity_in_stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="rating_average">Đánh giá trung bình</label>
                            <input
                                type="number"
                                className="form-control"
                                id="rating_average"
                                name='rating_average'
                                value={formData.rating_average}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                                <label htmlFor="book_cover">Bìa sách</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="book_cover"
                                     name='book_cover'
                                    value={formData.book_cover}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="loai_bia">Loại bìa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="loai_bia"
                                     name='loai_bia'
                                    value={formData.loai_bia}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="isbn13">IBN-13</label>
                            <input
                                type="number"
                                className="form-control"
                                id="isbn13"
                                 name='isbn13'
                                value={formData.isbn13}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label htmlFor="dich_gia">Dịch giả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dich_gia"
                                     name='dich_gia'
                                    value={formData.dich_gia}
                                    onChange={handleChange}
                                />
                        <div className="invalid-feedback">Vui lòng chọn dịch giả.</div>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="publisher_vn" className="form-group">Công ty phát hành</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="publisher_vn"
                                     name='publisher_vn'
                                    value={formData.publisher_vn}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="publication_date">Ngày xuất bản</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="publication_date"
                                     name='publication_date'
                                    value={formData.publication_date}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                                <label htmlFor="edition">Phiên bản</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="edition"
                                     name='edition'
                                    defaultValue={formData.edition}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="dimensions">Kích thước</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dimensions"
                                     name='dimensions'
                                    value={formData.dimensions}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="number_of_page">Số trang</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="number_of_page"
                                    name='number_of_page'
                                    value={formData.number_of_page}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="categories" className="form-label">Thể loại *</label>
                            <select id="categories" className="form-select" required>
                                <option >{formData.categories}</option>
                                {/* <option>Sách tiếng việt</option> */}
                                <option>Sách tư duy-Kỹ năng sống </option>
                                <option>Sách doanh nhân</option>
                                <option>Sách kỹ năng làm việc</option>
                            </select>
                            <div className="invalid-feedback">Vui lòng chọn thể loại.</div>
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="current_seller" className="form-label">Nhà xuất bản *</label>
                            <select id="current_seller" className="form-select" required>
                                <option>{formData.current_seller}</option> 
                                {/* <option>Nhà sách Fahasa</option> */}
                                <option>Eco Trading </option>
                                <option>Sbooks</option>
                                <option>BookShop Trading</option> 
                            </select>
                            <div className="invalid-feedback">Vui lòng chọn nhà xuất bản</div>
                        </div>
                <button
                    type="submit"
                    className="btn my-4 btn-primary btn-block EditBooks btn-sm "
                    style={{width:"48%", height:"48px"}}
                    onClick={handleUpdateBook}
                    >
                    Cập nhật
                </button>
                <button
                    type="submit"
                    className="btn my-4 btn-primary btn-block ListBooks btn-sm "
                    style={{width:"48%"}}
                    onClick={handleBackClick}    
                    >
                    Quay lại
                </button>
               
            </form>
                </div>
            </div>
 
        </div>
        )}
        <Footer/>
        </>
    )
}

export default BookAdminDetail