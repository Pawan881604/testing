"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "../modal/modal";
import { SEOForm } from "../common/form/seo-form";
import Image from "next/image";
interface ImageCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isVisible?: boolean;
}

export default function Server_image_card({
  src,
  alt,
  width,
  height,
  isVisible = false,
}: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Card className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <CardContent>
          {/* NextUI Image component with zoom effect */}
          <Image src={src} alt={alt} width={width} height={height} priority />
        </CardContent>
      </Card>
      {isVisible && (
        <Modal
          title="Edit SEO Information"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <SEOForm imageSrc={src} imageAlt={alt} />
        </Modal>
      )}
    </>
  );
}
