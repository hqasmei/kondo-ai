import React from "react";

const Demo = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-3xl font-bold text-center">
          See KondoAI in Action
        </h2>
        <p className="text-center text-gray-600">
          Watch our demo to see how KondoAI transforms cluttered spaces into
          organized havens.
        </p>
      </div>

      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden shadow-lg mt-6">
        <iframe
          src={`https://www.youtube.com/embed/Wdcanc2E_lk`}
          title="KondoAI Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-screen"
        ></iframe>
      </div>
    </div>
  );
};

export default Demo;
