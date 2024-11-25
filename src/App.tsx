import React, { useState } from 'react';
import { dishes } from './data/dishes';
import { DishCard } from './components/DishCard';
import { DishDetail } from './components/DishDetail';
import { Search, Flame, UtensilsCrossed } from 'lucide-react';
import type { Dish } from './data/dishes';

function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = ['全部', ...new Set(dishes.map(dish => dish.category))];

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.pinyinName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || dish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-800 to-red-600 text-white py-8 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <UtensilsCrossed size={32} className="text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">小向专属点菜系统</h1>
                <p className="text-red-100 mt-1">精选川味 • 独特风味</p>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mt-6 relative">
            <input
              type="text"
              placeholder="搜索你想要的美味..."
              className="w-full px-4 py-3 pl-12 rounded-xl text-gray-900 bg-white/95 backdrop-blur-sm shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-gray-800 shadow-xl sticky top-0 z-10 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-4 py-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all transform hover:scale-105
                  ${selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onSelect={setSelectedDish}
            />
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-16">
            <Flame size={48} className="mx-auto text-red-500 mb-4" />
            <p className="text-gray-400 text-lg">没有找到相关菜品</p>
          </div>
        )}
      </main>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <DishDetail
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
}

export default App;