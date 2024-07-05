import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className='container mx-auto'>
      <div className="h-screen flex items-center justify-center">
        <div className='flex-col justify-center'>
          <h1 className="text-6xl font-bold mb-4 text-center">Welcome to <span className='drop-shadow-lg bg-gradient-to-r from-orange-500 to-red-800 inline-block text-transparent bg-clip-text'>SpotHub</span></h1>
          <div className="text-xl text-center mb-4">Find out what people have to say about UC Irvine's most popular study spots!</div>
          <div className='flex justify-center '>
            <Button size='lg'>Get Started</Button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
