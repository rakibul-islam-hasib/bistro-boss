import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import SectionTitle from '../../../shared/SectionTitle';
import { useLoaderData } from 'react-router-dom';

const UpdateItem = () => {
    const [image, setImage] = useState(null);
    const axiosSecure = useAxiosSecure();
    const KEY = import.meta.env.VITE_IMG_TOKEN;
    const loaderData = useLoaderData();
    console.log("🚀 ~ file: UpdateItem.jsx:11 ~ UpdateItem ~ data:", loaderData)

    const categories = ['salad', 'pizza', 'desserts', 'drinks', 'offered'];
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const [defaultImage, setDefaultImage] = useState(loaderData.photo);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const ObjData = Object.fromEntries(formData);

        formData.append('file', image);
        fetch(API_URL, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())

            .then((data) => {
                if (data.success) {
                    const { name, price, category, recipe } = ObjData;
                    const newData = {
                        name,
                        price: Number(price),
                        category,
                        recipe,
                        image: data.data.display_url,
                    };
                    axiosSecure.patch(`/item/${loaderData._id}`, newData)
                    .then((result) => {
                        console.log(result);
                        console.log('Image uploaded successfully!');
                    })

                } else {
                    throw new Error('Image upload failed!');
                }
            }
            )

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setDefaultImage(URL.createObjectURL(file));
    };

    return (
        <div className="px-11">
            {/* <h1 className="text-2xl font-bold mb-4">Add Recipe</h1> */}
            <SectionTitle title="Need Changes ?" body='UPDATE THIS ITEM' />
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="recipeName" className="block mb-2 font-bold">
                        Recipe Name
                    </label>
                    <input
                        type="text"
                        defaultValue={loaderData.name}
                        name="name"
                        className="border outline-none border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div className="flex w-full">
                    <div className="mb-4 w-full">
                        <label htmlFor="category" className="block mb-2 font-bold">
                            Category
                        </label>
                        <select
                            id="category"
                            defaultValue={loaderData.category}
                            name="category"
                            className="border border-gray-400 p-[9px] outline-none w-full"
                            required
                        >
                            <option className='uppercase' value="">Select a category</option>
                            {categories.map((category) => (
                                <option className='uppercase' key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="price" className="block mb-2 font-bold">
                            Price
                        </label>
                        <input
                            type="number"
                            defaultValue={loaderData.price}
                            name="price"
                            className="border outline-none border-gray-400 p-2 w-full"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-bold">
                        Description
                    </label>
                    <textarea
                        name="recipe"
                        defaultValue={loaderData.recipe}
                        className="border outline-none resize-none border-gray-400 p-2 w-full"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">

                    <label htmlFor="image" className="block mb-2 font-bold">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="border outline-none border-gray-400 p-2 w-full"
                        accept="image/*"
                        onChange={handleImageChange}
                        defaultValue={defaultImage}
                        required
                    />
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="add-btn text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItem;