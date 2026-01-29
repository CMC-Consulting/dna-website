import { Link } from "@/i18n/routing";
import Icons from "../global/icons";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border/60 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
          <div className="w-full h-full">
            <div className="flex flex-col items-start justify-start md:max-w-[200px]">
              <div className="flex items-center gap-2 text-[#276df0]">
                <Icons.icon className="w-auto h-5" />
                <span className="text-2xl md:text-lg font-bold">
                  CMC Consulting AI
                </span>
              </div>
              <p className="text-muted-foreground mt-4 text-sm text-start">
                We are a team of experts who are passionate about helping businesses grow.
              </p>
            </div>
          </div>

          <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="w-full h-auto">
                <h3 className="text-base font-medium text-foreground">
                  Product
                </h3>
                <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                  <li className="mt-2">
                    <Link href="#" className="hover:text-foreground transition-all duration-300">
                      Features
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="hover:text-foreground transition-all duration-300">
                      Pricing
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="hover:text-foreground transition-all duration-300">
                      Testimonials
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="hover:text-foreground transition-all duration-300">
                      Supported Languages
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full h-auto">
                <div className="mt-10 md:mt-0 flex flex-col">
                  <h3 className="text-base font-medium text-foreground">
                    Solutions
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                    <li>
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        Content Creators
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        Businesses
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        Education
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        Enterprise
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="w-full h-auto">
                <h3 className="text-base font-medium text-foreground">
                  Resources
                </h3>
                <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                  <li className="mt-2">
                    <Link href="#" className="hover:text-foreground transition-all duration-300">
                      Blog
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="hover:text-foreground transition-all duration-300">
                      Translation Guides
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="hover:text-foreground transition-all duration-300">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full h-auto">
                <div className="mt-10 md:mt-0 flex flex-col">
                  <h3 className="text-base font-medium text-foreground">
                    Company
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                    <li>
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        About Us
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} CMC Consulting AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
