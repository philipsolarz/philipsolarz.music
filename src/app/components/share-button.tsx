'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Share2 } from 'lucide-react'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share"

interface ShareButtonProps {
    url: string
    title: string
    size?: "default" | "sm"
}

export function ShareButton({ url, title, size = "default" }: ShareButtonProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size={size}
                    className={size === "sm" ? "h-8 w-8 p-0" : ""}
                >
                    <Share2 className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-black/90 border-white/10">
                <DropdownMenuItem className="focus:bg-white/10">
                    <FacebookShareButton url={url} quote={title} className="w-full">
                        <div className="flex items-center gap-2">
                            <FacebookIcon size={24} round />
                            <span>Facebook</span>
                        </div>
                    </FacebookShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">
                    <TwitterShareButton url={url} title={title} className="w-full">
                        <div className="flex items-center gap-2">
                            <TwitterIcon size={24} round />
                            <span>Twitter</span>
                        </div>
                    </TwitterShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">
                    <WhatsappShareButton url={url} title={title} className="w-full">
                        <div className="flex items-center gap-2">
                            <WhatsappIcon size={24} round />
                            <span>WhatsApp</span>
                        </div>
                    </WhatsappShareButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

