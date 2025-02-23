import React, { useState, useEffect } from 'react';
import { getOrder } from "../../api/orderService";
import ImageUploader from "../../components/ImageUploadCustom";
import UserDefaultImage from "../../images/user_profile.png";
import './notFound.css';

const ManageOrders = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = () => {
    const filterStartDate = startDate ? new Date(startDate) : null;
    const filterEndDate = endDate ? new Date(endDate) : null;

    const filteredOrders = allOrders.filter(order => {
      const orderTimestamp = order.date._seconds * 1000; // Convert to milliseconds

      if (filterStartDate && orderTimestamp < filterStartDate.getTime()) {
        return false;
      }

      if (filterEndDate && orderTimestamp > filterEndDate.getTime()) {
        return false;
      }

      return true;
    });

    setFilteredOrders(filteredOrders);
    setCurrentPage(1);
  };

  const totalMoney = filteredOrders.reduce((total, order) => total + parseFloat(order.paid_money), 0);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const visiblePageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const fetchOrders = async () => {
    try {
      const { statusCode, ordersData } = await getOrder();
      if (ordersData && statusCode === 200) {
        setAllOrders(ordersData);
        setFilteredOrders(ordersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Admin Page: Manage Orders';
    fetchOrders();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section>
      <h2>Manage Orders</h2>
      <div className="container">
        <div className="date-filter">
          <p className="Filter bold-text">Filter By:</p>
          <div className="margin-right-50">
            <label>From Date: </label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>

          <div className="margin-right-50">
            <label>To Date: </label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>

          <button className="bold-text" onClick={handleFilter}>
            Filter
          </button>
        </div>

        <div className="total-money">
          <p>Total Money: $ {totalMoney.toFixed(2)}</p>
        </div>

        <table className="orders-table">
          <thead>
            <tr><th>Display Name</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Service Type</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Paid Money</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(order => (
              <tr key={order.orderId}>
                <td>
                  <div className="avatar-container">
                    <div className="avatar-wrapper">
                      <ImageUploader defaultImage={`${order.photoURL ? order.photoURL : UserDefaultImage}`} typeImage={"photo"} />
                    </div>
                    <span>{order.displayName}</span>
                  </div>
                </td>
                <td>{new Date(order.date._seconds * 1000).toLocaleDateString()}</td>
                <td>{order.orderId}</td>
                <td>{order.service_type}</td>
                <td>{new Date(order.start_time._seconds * 1000).toLocaleDateString()}</td>
                <td>{new Date(order.end_time._seconds * 1000).toLocaleDateString()}</td>
                <td>{order.paid_money}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {visiblePageNumbers.map(pageNumber => (
            <button
              key={pageNumber}
              className={`pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManageOrders;