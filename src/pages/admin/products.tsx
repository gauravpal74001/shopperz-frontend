import { type ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/product-api";
import toast  from "react-hot-toast";
import type { CustomError } from "../../types/types";
import { useSelector } from "react-redux";
import type { userReducerInitialStateTypes } from "../../types/user-reducer";
import Skeleton from "../../components/skeleton";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const {user} =useSelector((state :{userReducer:userReducerInitialStateTypes})=>state.userReducer)
  const {data , isLoading , isError , error} = useAllProductsQuery(user?._id!);
  if(isError) toast.error((error as CustomError).data.message);

  useEffect(()=>{
     if(data){
       setRows(data.products.map((i)=>({
      photo: <img src={i.photos[0].url}/> , 
      name:i.name,
      price:i.price,
      stock:i.stock,
      action:<Link  to={`/admin/product/${i._id}`}>Manage</Link>
        })))
  }
  },[data])
  

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main> {isLoading? <Skeleton/> : Table} </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
