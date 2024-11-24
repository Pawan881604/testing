"use client";
import LoadingPage from "@/components/common/loading-page";
import ShadcnTableFooter from "@/components/common/shadcn-table/table-footer";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import { useGetAllImagesQuery } from "@/state/karnal-web-tech/imageApi";
import { useState } from "react";

// Mock data for images
const images = Array.from({ length: 100 }, (_, i) => ({
  src: `https://firebasestorage.googleapis.com/v0/b/storage-30b82.appspot.com/o/1732432753010-667a2e7c5462271e8b19fbbf-calenzana-12x9x3-brown-shipping-box-set.jpg?alt=media&token=7UudWWIw`,
  alt: `Image ${i + 1}`,
}));

const IMAGES_PER_PAGE = 15;

export default function ImageGallery() {
  const [rowsPerPage, setRowsPerPage] = useState<string>("25");
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading } = useGetAllImagesQuery({
    rowsPerPage: Number(rowsPerPage),
    page: page,
  });
  console.log(data);
  useHandleNotifications({ error: error });
  const { data: api_data } = data || {};
  return (
    <div className="container mx-auto py-8">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {api_data?.result.map((image: any, index: number) => (
              <Server_image_card
                width={300}
                height={200}
                key={index}
                src={image.path}
                alt={image.altText || "image"}
                isVisible={true}
              />
            ))}
          </div>
          <ShadcnTableFooter
            currentPage={page}
            totalPages={api_data?.resultPerPage}
            setCurrentPage={setPage}
            data_length={api_data?.dataCounter}
          />
        </>
      )}
    </div>
  );
}
