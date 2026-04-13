import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    const arr = [1, 4, 5, [6, [7, 8]], 9];
const res: number[] = [];

const recfun = (arr: any[]): void => {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      res.push(arr[i]);
    } else {
      recfun(arr[i]);  // recursive call for nested arrays
    }
  }
};
const obj = {name:"Akash",
  callName: function(){
    console.log("aaaa",this.name)
  }
}
obj.callName()

recfun(arr);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-6">
        <h1 className="text-4xl font-bold mb-4">About Our Café ☕</h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          Welcome to My Café! We serve freshly brewed coffee, homemade pastries, 
          and a warm smile every day. Our mission is to create a cozy space 
          where friends and family can connect over great coffee.
        </p>
      </main>
      <Footer />
    </>
  );
}
