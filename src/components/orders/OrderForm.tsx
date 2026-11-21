import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../ui/Modal";
import { useInventory } from "../../hooks/useInventory";
import { orderSchema, type OrderFormFields } from "../../schemas/orderSchema";

type OrderFormProps = {
  /** Runs with the form data when the form is valid and submitted */
  onSave: (data: OrderFormFields) => void;
  /** Runs when the user clicks Cancel or clicks outside the popup */
  onClose: () => void;
};

/**
 * Popup form to add a new order.
 * The form is checked with React Hook Form and Zod using orderSchema.
 */

const inputClass = "w-full rounded-lg border border-[#fbcfe8] bg-white px-4 py-3 font-semibold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#C2416C]";

const labelClass = "block mb-2 text-sm font-semibold text-[#7a5c43]";

const errorClass = "mt-1 text-xs text-red-500";

const OrderForm = ({ onSave, onClose }: OrderFormProps) => {
  const { items } = useInventory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormFields>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer: "",
      product: "",
      quantity: 1,
    },
  });

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSave)}
        noValidate
        className="w-120 max-w-full flex flex-col gap-5 rounded-2xl bg-[#fff7fa] p-7"
      >
        <h2 className="text-2xl font-bold text-[#4a2c11]">Add new order</h2>

        <div>
          <label className={labelClass}>Customer</label>
          <input
            {...register("customer")}
            placeholder="Customer name"
            className={inputClass}
          />
          {errors.customer && (
            <p className={errorClass}>{errors.customer.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Product</label>
          <select {...register("product")} className={inputClass}>
            <option value="">Select Iteam</option>
            {items.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          {errors.product && (
            <p className={errorClass}>{errors.product.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Quantity</label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.quantity && (
            <p className={errorClass}>{errors.quantity.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d1d5db] bg-[#f3f4f6] px-5 py-3 font-semibold text-[#374151] hover:bg-[#e5e7eb]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#b85c80] px-5 py-3 font-semibold text-white hover:bg-[#C2416C]"
          >
            Add order
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderForm;
