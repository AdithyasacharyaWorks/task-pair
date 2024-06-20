import { HoverEffect } from "@/components/ui/card-hover-effect";
 function CardHoverEffect({projects}:any) {
    return (
      <div className="w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    );
  }

  export default CardHoverEffect;