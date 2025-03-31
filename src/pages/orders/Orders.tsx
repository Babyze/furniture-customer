import Table, { Column, PaginationConfig } from '@src/components/ui/Table';
import { Order } from '@src/models/order.model';
import { orderService } from '@src/services/order.service';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [paginate, setPaginate] = useState<PaginationConfig>({
    currentPage: 1,
    itemPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrders({ page: currentPage, limit: pageSize });
        setOrders(data.items);
        setPaginate({
          currentPage: data.meta.currentPage,
          itemPerPage: data.meta.itemsPerPage,
          totalItems: data.meta.totalItems,
          totalPages: data.meta.totalPages,
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns: Column<Order>[] = [
    {
      key: 'id',
      title: 'Order ID',
    },
    {
      key: 'fullName',
      title: 'Full Name',
    },
    {
      key: 'phoneNumber',
      title: 'Phone Number',
    },
    {
      key: 'address',
      title: 'Address',
    },
    {
      key: 'totalPrice',
      title: 'Total',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`order-status order-status--${value}`}>
          {value === 'pending' ? 'Processing' : value === 'cancelled' ? 'Cancelled' : 'Finished'}
        </span>
      ),
    },
    {
      key: 'createdDate',
      title: 'Created Date',
      render: (value) => dayjs(value as string).format('DD/MM/YYYY'),
    },
  ];

  return (
    <div className="orders">
      <h1 className="orders__title">Order history</h1>
      {orders && (
        <>
          <Table
            columns={columns}
            data={orders}
            loading={loading}
            pagination={paginate}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Orders;
