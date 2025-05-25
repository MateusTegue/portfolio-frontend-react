import React from "react";
"use client";

import { Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsLinkedin, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComponent = () => {
        return (
            <Footer bgDark className="bg-gray-800 rounded-none mt-auto">
              <div className="w-full">
                <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                  <FooterCopyright href="#" by="Mateus™" year={2025} />
                  <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                    <FooterIcon href="#" icon={BsFacebook} />
                    <FooterIcon href="#" icon={BsInstagram} />
                    <FooterIcon href="#" icon={BsTwitter} />
                    <FooterIcon href="#" icon={BsGithub} />
                    <FooterIcon href="https://www.linkedin.com/in/mateus-tegue/" target="_blank" icon={BsLinkedin} />
                  </div>
                </div>
              </div>
            </Footer>
          );
}

export default FooterComponent;


