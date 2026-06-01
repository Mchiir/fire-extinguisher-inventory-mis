import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Package, Plus, Search, Edit2, Trash2 } from 'lucide-react';

const Products = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const isAdmin = user?.role === 'ADMIN' || user?.role === 'INVENTORY_MANAGER';

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.extinguisherType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Product Catalog</h1>
                    <p className="text-slate-500">View and manage fire extinguisher products</p>
                </div>
                {isAdmin && (
                    <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Add Product</span>
                    </button>
                )}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 focus:outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p>Loading products...</p>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    {isAdmin && (
                                        <div className="flex space-x-2">
                                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-danger transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                    <div>
                                        <p className="text-slate-400 uppercase text-[10px] font-bold">Type</p>
                                        <p className="text-slate-700 font-medium">{product.extinguisherType}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 uppercase text-[10px] font-bold">Capacity</p>
                                        <p className="text-slate-700 font-medium">{product.capacity}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-xl font-bold text-primary">${product.price}</span>
                                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium">
                                        {product.maintenanceInterval}mo interval
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-slate-500 py-12">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
