import { useState } from "react";
import { useOrderStore } from "../hooks/useOrder";
import OrderForm from "../components/orders/OrderForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import type { Order, OrderStatus } from "../types/order";
import type { OrderFormFields } from "../schemas/orderSchema";

const statusColors: Record<OrderStatus, string> = {
  Pending: "bg-[#fef9c3] text-[#a16207]",
  Completed: "bg-[#dcfce7] text-[#15803d]",
  Cancelled: "bg-[#fee2e2] text-[#b91c1c]",
};

const optionClass =
  "bg-white text-[#111827] dark:bg-[#18191C] dark:text-[#F4F4F5]";

const Orders = () => {
  const orders = useOrderStore((state) => state.orders);
  const addOrder = useOrderStore((state) => state.addOrder);
  const updateStatus = useOrderStore((state) => state.updateStatus);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  const [isAdding, setIsAdding] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);

  const handleAdd = (data: OrderFormFields) => {
    addOrder({
      ...data,
      id: Date.now().toString(),
      status: "Pending",
    });
    setIsAdding(false);
  };

  const handleDelete = () => {
    if (!deletingOrder) return;
    deleteOrder(deletingOrder.id);
    setDeletingOrder(null);
  };

  return (
    <div className="flex flex-col gap-6">
     

      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{orders.length} orders</p>
        <button
          onClick={() => setIsAdding(true)}
          className="rounded-lg bg-[#C2416C] px-4 py-2 text-sm font-medium text-white hover:bg-[#a83660] cursor-pointer"
        >
          + Add Order
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white dark:border-[#2A2B30] dark:bg-[#18191C]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f9fafb] text-xs uppercase text-[#6b7280] dark:bg-[#1F2023] dark:text-[#A1A1AA]">
            <tr>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Quantity</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2A2B30]">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-3 font-medium">{order.customer}</td>
                <td className="px-5 py-3">{order.product}</td>
                <td className="px-5 py-3">{order.quantity}</td>

                <td className="px-5 py-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value as OrderStatus)
                    }
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium outline-none ${statusColors[order.status]}`}
                  >
                    <option value="Pending" className={optionClass}>
                      Pending
                    </option>
                    <option value="Completed" className={optionClass}>
                      Completed
                    </option>
                    <option value="Cancelled" className={optionClass}>
                      Cancelled
                    </option>
                  </select>
                </td>

                <td className="px-5 py-3">
                  <button
                    onClick={() => setDeletingOrder(order)}
                    className="rounded-lg border border-[#e5e7eb] px-3 py-1 text-xs hover:border-[#ce4661] hover:bg-[#ce4661] hover:text-white dark:border-[#2A2B30]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-6 text-center text-sm text-[#6b7280]">
            No orders yet.
          </p>
        )}
      </div>

      {isAdding && (
        <OrderForm
          onSave={handleAdd}
          onClose={() => setIsAdding(false)}
        />
      )}

      {deletingOrder && (
        <ConfirmDialog
          title="Delete order"
          message={`Delete the order for ${deletingOrder.customer}?`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;