import { BiMap, BiPhone, BiEnvelope } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import SectionTitleComponent from "../../components/Common/SectionTitle/SectionTitle";
import { container } from "../../utils/classNames";
import { contactLinks } from "../../utils/navLinks";
import SocialNavComponent from "../../components/Common/SocialNav/SocialNav";

export default function ContactPage() {
  const mapEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187913899!2d90.33728828261802!3d23.780975727977594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1765470823531!5m2!1sen!2sbd";

  return (
    <>
      <div className={`${container} mt-26`}>
        <div className="bg-base-100 rounded-2xl shadow-lg sm:p-8 p-4 md:p-12">
          <SectionTitleComponent
            title={"Contact Us"}
            subtitle={"We’re here to help. Reach out to us anytime."}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="grid lg:grid-cols-1 sm:grid-cols-3 gap-6">
                {contactLinks.map((link, index) => (
                  <div
                    className="flex lg:items-center max-sm:items-center lg:flex-row sm:flex-col gap-4 p-6 border border-primary/10 rounded-xl shadow-md hover:shadow-xl transition-all break-all"
                    key={index}
                  >
                    <link.icon className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-medium mb-1">{link.title}</h3>
                      <p className="text-neutral/80">{link.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex max-lg:justify-center gap-4">
                <SocialNavComponent />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-primary/10 shadow">
              <iframe
                src={mapEmbed}
                className="w-full lg:h-full max-lg:aspect-video"
                allowFullScreen
                loading="lazy"
                title="Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
