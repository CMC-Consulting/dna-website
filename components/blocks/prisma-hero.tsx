
import ParticlesBg from '@/components/blocks/Particles-animation';
import MainButton from '@/components/ui/main-button';
import { Link } from '@/i18n/routing';


export default function PrismaHero() {
  return (
    <>
      <section className="relative w-full min-h-screen overflow-hidden py-56 lg:py-52 px-4 sm:px-6 lg:px-8 flex sm:items-center">
        <ParticlesBg />
        <div className="bg-gradient-to-b from-[#0d9488] to-[#ffffff] opacity-20 absolute inset-0"></div>

        <div className='max-w-5xl mx-auto '>
          <div className='flex flex-col gap-10 items-center'>
            <h1 className='text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold drop-shadow-lg text-center flex flex-col gap-3 text-[#111827]'>
              <span>Prisma,</span>
              <span>Build Faster. Scale Smarter. Power Your Data with Prisma.</span>
            </h1>
            <span className='text-center md:text-lg lg:text-2xl'>Streamline your database workflows with a modern, type-safe ORM designed for speed, scalability, and developer productivity.</span>
          </div>
          <div className='flex justify-center items-center gap-6 md:gap-11 py-12 flex-wrap'>
            <Link href="#feature-list" className="flex justify-center max-w-[70%]">
              <MainButton
                text='Notable features'
                size='medium'
                className='w-full rounded-lg bg-[linear-gradient(135deg,#0f1e35,#276df0)] px-6 text-base font-semibold text-primary-foreground shadow-md backdrop-blur-md transition-all duration-300 ease-out hover:brightness-105 hover:shadow-lg hover:scale-[1.01] hover:-translate-y-px active:scale-[0.99]'
              />
            </Link>

            <Link href="#review-list" className="flex justify-center max-w-[65%]">
              <MainButton
                text='Evaluate'
                size='medium'
                className='w-full rounded-lg border border-[#cdd9e8]  bg-white/80 text-gray-800 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:bg-white/95 hover:shadow-md hover:scale-[1.01] hover:-translate-y-px active:scale-[0.99]'
              />
            </Link>

          </div>
        </div>
      </section>
    </>
  )
}
