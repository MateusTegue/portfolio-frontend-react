import React from "react";
"use client";

import { Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsLinkedin, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComponent = () => {
        return (
            <Footer bgDark className="bg-gray-800 rounded-none mt-auto">
              <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                  <div>
                    <FooterTitle title="Compañia" />
                    <FooterLinkGroup col>
                      <FooterLink href="#">About</FooterLink>
                      <FooterLink href="#">Blog</FooterLink>
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="Contactos" />
                    <FooterLinkGroup col>
                      <FooterLink href="#">Twitter</FooterLink>
                      <FooterLink href="#">Contact Us</FooterLink>
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="legal" />
                    <FooterLinkGroup col>
                      <FooterLink href="#">Privacy Policy</FooterLink>
                      <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="Descargas" />
                    <FooterLinkGroup col>
                      <FooterLink href="#">Android</FooterLink>
                      <FooterLink href="#">Windows</FooterLink>
                    </FooterLinkGroup>
                  </div>
                </div>
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


