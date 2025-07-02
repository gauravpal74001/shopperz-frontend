import { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useNewProductsMutation } from "../../../redux/api/product-api";
import { useSelector } from "react-redux";
import type { userReducerInitialStateTypes } from "../../../types/user-reducer";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import { useFileHandler } from "6pp";

const NewProduct = () => {
  const navigate = useNavigate();
  const [newProducts] = useNewProductsMutation();
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialStateTypes }) => state.userReducer
  );
  const [loading , setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);

  const photos = useFileHandler("multiple", 5, 5);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !price || !stock || !category) {
      toast.error("All fields are required");
      return;
    }

    if (!photos.file) {
      return toast.error("Please upload at least one photo");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category);
    photos.file.forEach((file) => formData.append("photos", file));

    try {
      const res = await newProducts({
        id: user?._id!,
        formData,
      });

      responseToast(res, navigate, "/admin/product");
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Error creating product");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input
                required
                type="file"
                multiple
                accept="image/*"
                onChange={photos.changeHandler}
              />
            </div>
            {photos.error && <p>{photos.error}</p>}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "stretch",
                alignItems: "center",
              }}
            >
              {photos.preview &&
                photos.preview.map((img, ind) => (
                  <img
                    key={ind}
                    src={img}
                    alt="preview"
                    style={{ maxWidth: "100px", marginRight: "10px" }}
                  />
                ))}
            </div>
            <button  className="button" disabled={loading} type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
