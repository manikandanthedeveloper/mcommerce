'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import slides from '@/util/banner';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


function HeroBanner() {
    const [active, setActive] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) return;

        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(id);
    }, [isHovering]);

    const goTo = (index: number) => setActive(index);
    const goPrev = () =>
        setActive((prev) => (prev - 1 + slides.length) % slides.length);
    const goNext = () => setActive((prev) => (prev + 1) % slides.length);

    return (
        <section
            className="relative overflow-hidden shadow-sm"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-roledescription="carousel"
            aria-label="Hero banner"
        >
            <div className="relative h-80 sm:h-105">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={cn(
                            'absolute inset-0 transition-opacity duration-700',
                            index === active ? 'opacity-100' : 'opacity-0'
                        )}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${slides.length}`}
                    >
                        <Image src={slide.imgSrc} alt={slide.title} fill className="object-cover" loading="eager" priority={index === active} />
                        <div className="relative flex h-full items-center">
                            <div className="max-w-xl p-6 sm:p-10 bg-black/60 dark:bg-background/30 ml-6 sm:ml-16">
                                <p className="text-xs uppercase tracking-[0.2em] text-white">
                                    {slide.kicker}
                                </p>
                                <h1 className="mt-3 text-3xl text-white font-semibold sm:text-5xl">
                                    {slide.title}
                                </h1>
                                <p className="mt-3 text-base text-white sm:text-lg">
                                    {slide.description}
                                </p>
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Button asChild>
                                        <Link href={slide.ctaHref}>{slide.ctaText}</Link>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <Link href={slide.secondaryHref}>{slide.secondaryText}</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute inset-y-0 left-3 flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goPrev}
                    aria-label="Previous slide"
                >
                    <FaChevronLeft />
                </Button>
            </div>
            <div className="absolute inset-y-0 right-3 flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goNext}
                    aria-label="Next slide"
                >
                    <FaChevronRight />
                </Button>
            </div>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        className={cn(
                            'h-2.5 w-2.5 rounded-full border',
                            index === active
                                ? 'bg-foreground'
                                : 'bg-transparent text-muted-foreground'
                        )}
                        onClick={() => goTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default HeroBanner;