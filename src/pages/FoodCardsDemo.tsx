
import React from "react";
import { ExpandableCard } from "@/components/ExpandableCard";

const FoodCardsDemo = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-xl font-medium">Food Cards Demo</h1>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-[1200px] mx-auto">
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Breakfast Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ExpandableCard
                title="Pancakes from Angie's"
                type="order"
                description="Stack of fluffy pancakes with maple syrup and butter"
                details={{
                  price: "$12.99",
                  vendor: "Angie's Breakfast Shop"
                }}
              />
              
              <ExpandableCard
                title="Healthy Smoothie Bowl"
                type="recipe"
                description="Nutritious and delicious smoothie bowl packed with superfoods"
                details={{
                  ingredients: [
                    "1 frozen banana",
                    "1 cup frozen mixed berries",
                    "1/2 cup Greek yogurt",
                    "1/4 cup almond milk",
                    "1 tbsp honey or maple syrup",
                    "Toppings: granola, fresh berries, chia seeds"
                  ],
                  instructions: "Blend all ingredients except toppings until smooth. Pour into a bowl and add toppings. Enjoy immediately!"
                }}
              />
              
              <ExpandableCard
                title="Morning Coffee"
                type="order"
                description="Freshly brewed premium coffee to kickstart your day"
                details={{
                  price: "$4.50",
                  vendor: "Coffee Corner"
                }}
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold mb-4">Lunch Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ExpandableCard
                title="Avocado Toast"
                type="recipe"
                description="Simple and nutritious avocado toast with various toppings"
                details={{
                  ingredients: [
                    "2 slices of whole grain bread",
                    "1 ripe avocado",
                    "2 eggs (optional)",
                    "Salt and pepper to taste",
                    "Red pepper flakes (optional)",
                    "Lemon juice"
                  ],
                  instructions: "Toast bread. Mash avocado and spread on toast. Add toppings as desired. For eggs, cook sunny-side up or poached and place on top."
                }}
              />
              
              <ExpandableCard
                title="Chicken Caesar Salad"
                type="order"
                description="Classic Caesar salad with grilled chicken and homemade dressing"
                details={{
                  price: "$14.99",
                  vendor: "Fresh Greens"
                }}
              />
              
              <ExpandableCard
                title="Veggie Wrap"
                type="order"
                description="Whole wheat wrap filled with seasonal vegetables and hummus"
                details={{
                  price: "$9.99",
                  vendor: "Veggie Delight"
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FoodCardsDemo;
