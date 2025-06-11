import React from "react";
"use client";

import { Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsLinkedin, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComponent = () => {
        return (
            <Footer bgDark className="bg-black-800 rounded-none mt-auto">
              <div className="w-full">
                <div className="w-full bg-black px-4 py-6 sm:flex sm:items-center sm:justify-between text-center sm:text-left">
                  <FooterCopyright href="#" by="Mateus™" year={2025} className="text-cyan-500" />
                  <div className="mt-4 flex justify-center space-x-6 sm:mt-0 sm:justify-center">
                    <FooterIcon href="#" icon={BsFacebook} className="text-blue-500 hover:text-blue-700" />
                    <FooterIcon href="#" icon={BsInstagram} className="text-pink-500 hover:text-pink-700" />
                    <FooterIcon href="#" icon={BsTwitter} className="text-blue-400 hover:text-blue-600" />
                    <FooterIcon href="https://github.com/MateusTegue" target="_blank" icon={BsGithub} className="text-gray-600 hover:text-gray-800" />
                    <FooterIcon href="https://www.linkedin.com/in/mateus-tegue/" target="_blank" icon={BsLinkedin} className="text-blue-500 hover:text-blue-700" />
                  </div>
                </div>
              </div>
            </Footer>
          );
}

export default FooterComponent;


