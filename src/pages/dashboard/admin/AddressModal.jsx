import { MdFiberManualRecord } from "react-icons/md";

const AddressModal = (props) => {
  const { item, modalId } = props; // Destructuring item from props
  console.log(item);
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button> */}
      <dialog id={modalId} className="p-5 bg-white rounded-lg shadow-lg modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="mb-4 text-lg font-bold text-center">
            Customer Details!
          </h3>

          <p className="py-2 text-sm font-medium">Customer Name : {item.name}</p>
          <p className="py-2 text-sm font-medium">Customer Email : {item.email}</p>
          <p className="py-2 pb-4 text-sm font-medium">Customer Address :<br/> {item.address}</p>
          <p className="py-2 text-sm font-medium">Postal Code : {item.postalCode}</p>
          <p className="py-2 text-sm font-medium">Total Price of the Order : $ {item.price}</p>
          <p className="py-2 text-sm font-medium">Ordered Menu Items Name :</p>
          {item.itemName.map((name, index) => (
            <p key={index} className="flex flex-row gap-2 px-5 py-2 text-sm font-medium">
              <span className="pt-1"><MdFiberManualRecord size={12} /></span> {name}
            </p>
          ))}
        </div>
      </dialog>
    </div>
  );
};

export default AddressModal;
