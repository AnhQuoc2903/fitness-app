import React, { useState, useEffect } from 'react';
import './notFound.css';


const ManageOrders = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orders, setOrders] = useState([
    {
		id: 1,
		displayName: 'John Doe',
		date: '2024-01-20',
		orderId: 'ABC123',
		serviceType: 'Service A',
		startTime: '10:00 AM',
		endTime: '12:00 PM',
		paidMoney: 50.00,
		avatar: 'path/to/avatar1.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  {
		id: 2,
		displayName: 'Jane Smith',
		date: '2024-01-21',
		orderId: 'XYZ789',
		serviceType: 'Service B',
		startTime: '2:00 PM',
		endTime: '4:00 PM',
		paidMoney: 75.50,
		avatar: 'path/to/avatar2.jpg',
	  },
	  

  ]);
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'Admin Page: Manage Orders';
  }, []);

  const handleFilter = () => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      const filterStartDate = startDate ? new Date(startDate) : null;
      const filterEndDate = endDate ? new Date(endDate) : null;

      if (filterStartDate && orderDate < filterStartDate) {
        return false;
      }

      if (filterEndDate && orderDate > filterEndDate) {
        return false;
      }

      return true;
    });

    setOrders(filteredOrders);
    setCurrentPage(1);
  };

  const totalMoney = orders.reduce((total, order) => total + parseFloat(order.paidMoney), 0);

  const itemsPerPage = 5; // Adjust the number of items per page as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <section>
		<h2>Manage Orders</h2>
      <div className="container">
       

        <div className="date-filter ">
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
            <tr>
              <th>ID</th>
              <th>Display Name</th>
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
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
        <div className="avatar-container">
          <img src={order.avatar} alt="Avatar" className="avatar" />
          <span>{order.displayName}</span>
        </div>
      </td>
                <td>{order.date}</td>
				<td>{order.orderId}</td>
                <td>{order.serviceType}</td>
                <td>{order.startTime}</td>
                <td>{order.endTime}</td>
                <td>{order.paidMoney}</td>
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
          <span className="pagination-current pagination-btn ">Page {currentPage}</span>
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