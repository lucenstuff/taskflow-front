import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="-mx-4 flex justify-center">
            <div className="w-full px-4 max-w-md text-center">
              <h2 className="mb-2 text-7xl font-bold leading-none]">404</h2>
              <div className="text-4xl">🕵️‍♂️🔍</div>
              <p className="text-4xl mb-6"></p>
              <h4 className="mb-3 text-md font-semibold leading-tighte">
                Oops! Página no encontrada
              </h4>
              <p className="mb-8 text-md">
                La página que busca no existe o no esta disponible.
              </p>
              <Button onClick={() => navigate(-1)}>Volver</Button>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </section>
    </>
  );
};

export default Error;
