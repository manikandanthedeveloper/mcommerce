"use client";

import { LuShare2 } from "react-icons/lu";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Copy } from "lucide-react";
import { EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";

const ShareButton = ({ productId, name }: { productId: string, name: string }) => {
    const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/products/${productId}`;

    return (
        <Popover>
            <PopoverTrigger asChild className="ml-auto">
                <Button variant="outline" size="icon" className="cursor-pointer rounded-none">
                    <LuShare2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex items-center gap-x-2 justify-center w-full" align="end" side="top" sideOffset={10} >
                <div className="flex flex-col items-start gap-y-2">
                    <p className="text-sm text-primary-dark/50">Share this product:</p>
                    <div className="flex gap-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(url)} className="cursor-pointer rounded-none">
                                        <Copy className="h-4 w-4" />
                                        <span className="sr-only">Copy URL</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>URL Copied!</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TwitterShareButton url={url} title={name} className="rounded-none">
                            <TwitterIcon size={32} round={false} />
                        </TwitterShareButton>
                        <LinkedinShareButton url={url} title={name} className="rounded-none">
                            <LinkedinIcon size={32} round={false} />
                        </LinkedinShareButton>
                        <EmailShareButton url={url} subject={name} className="rounded-none">
                            <EmailIcon size={32} round={false} />
                        </EmailShareButton>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ShareButton