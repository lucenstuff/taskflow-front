import React from "react";

const Error = () => {
  return (
    <>
      <section className="relative z-10 bg-red-600 min-h-screen flex items-center py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex justify-center">
            <div className="w-full px-4 max-w-md text-center">
              <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                404
              </h2>
              <h4 className="mb-3 text-[28px] font-semibold leading-tight text-white">
                Oops! Página no encontrada
              </h4>
              <p className="mb-8 text-[20px] text-white">
                La página que busca no existe o no esta disponible
              </p>
              <a
                href="/"
                className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-red-600"
              >
                Volver al Login
              </a>
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
