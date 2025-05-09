type BannerProps = {
    mainImages: string[];
    sideImages?: string[];
};

function Banner({ mainImages, sideImages = [] }: BannerProps) {
    return (
        <div className="sm:px-10 md:px-10 lg:px-22 xl:px-36">
            <div className="flex pt-4">
                <div className="banner-container flex overflow-hidden w-full">
                    {mainImages.map((src, index) => (
                        <img
                            key={index}
                            className="w-full h-auto animate-slide mr-2"
                            src={src}
                            alt={`Main ${index}`}
                        />
                    ))}
                </div>

                {sideImages.length > 0 && (
                    <div className="mx-4 hidden xl:block xl:mx-4 xl:h-36">
                        {sideImages.map((src, index) => (
                            <img
                                key={index}
                                className="mb-6 h-36"
                                src={src}
                                alt={`Side ${index}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Banner;
