import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUploadURL } from "../../../Api/utlis";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState("upload Image");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const from = e.target;
    const name = from.name.value;
    const description = from.description.value;
    const category = from.category.value;
    const price = parseFloat(from.price.value);
    const quantity = parseInt(from.quantity.value);
    const image = from.image.files[0];
    const imageURL = await imageUploadURL(image);
    const seller = {
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
    };

    const plantData = {
      name,
      description,
      category,
      price,
      quantity,
      imageURL,
      seller,
    };

    try {
      await axiosSecure.post("/plants", plantData);
      toast.success("Plant added successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      from.reset();
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <div>
        <AddPlantForm
          handleSubmit={handleSubmit}
          uploadImage={uploadImage}
          setUploadImage={setUploadImage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddPlant;
