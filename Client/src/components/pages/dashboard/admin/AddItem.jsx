import React from 'react';

const AddItem = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="recipeName" className="block mb-2 font-bold">
                        Recipe Name
                    </label>
                    <input
                        type="text"
                        id="recipeName"
                        className="border border-gray-400 p-2 w-full"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 font-bold">
                        Category
                    </label>
                    <select
                        id="category"
                        className="border border-gray-400 p-2 w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2 font-bold">
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        className="border border-gray-400 p-2 w-full"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-bold">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="border border-gray-400 p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        className="border border-gray-400 p-2 w-full"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;