"use client";
import ShadcnTableFooter from "@/components/common/shadcn-table/table-footer";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { useState } from "react";

// Mock data for images
const images = Array.from({ length: 100 }, (_, i) => ({
  src: `https://firebasestorage.googleapis.com/v0/b/storage-30b82.appspot.com/o/1732432753010-667a2e7c5462271e8b19fbbf-calenzana-12x9x3-brown-shipping-box-set.jpg?alt=media&token=7UudWWIw`,
  alt: `Image ${i + 1}`,
}));

const IMAGES_PER_PAGE = 15;

export default function ImageGallery() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastImage = currentPage * IMAGES_PER_PAGE;
  const indexOfFirstImage = indexOfLastImage - IMAGES_PER_PAGE;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {currentImages.map((image, index) => (
          <Server_image_card
            width={300}
            height={200}
            key={index}
            src={image.src}
            alt={image.alt}
            isVisible={true}
          />
        ))}
      </div>
      <ShadcnTableFooter
        currentPage={currentPage}
        totalPages={IMAGES_PER_PAGE}
        setCurrentPage={setCurrentPage}
        data_length={100}
      />
    </div>
  );
}
