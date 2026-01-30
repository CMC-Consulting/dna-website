'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BorderBeam } from '@/components/ui/border-beam'
import { Database, Layers, Shield } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

export default function DataServices() {
    type ImageKey = 'item-1' | 'item-2' | 'item-3'
    const [activeItem, setActiveItem] = useState<ImageKey>('item-1')

    const images = {
        'item-1': {
            image: '/dataservices/Data Governance & Management 3.png',
            alt: 'Data Governance dashboard',
        },
        'item-2': {
            image: '/dataservices/Data Governance & Management 2.png',
            alt: 'Data Lakehouse architecture',
        },
        'item-3': {
            image: '/dataservices/Data Governance & Management 4.png',
            alt: 'Data Integration pipelines',
        },
    }

    return (
        <section className="w-full bg-background py-16 sm:py-20 lg:py-48">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-balance text-4xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
                        Enterprise Data Services
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Build a solid data foundation with our comprehensive data services. From governance to integration, we help you unlock the full potential of your data assets.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
                    <Accordion
                        type="single"
                        value={activeItem}
                        onValueChange={(value) => setActiveItem(value as ImageKey)}
                        className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 text-base">
                                    <Shield className="size-4" />
                                    Data Governance
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>Establish robust data governance frameworks with policies, standards, and controls. Ensure data quality, security, and compliance with metadata management, data lineage tracking, and privacy controls across your organization.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 text-base">
                                    <Database className="size-4" />
                                    Data Lakehouse
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>Modern data architecture combining the flexibility of data lakes with the reliability of data warehouses. Unified storage layer with ACID transactions, schema enforcement, and cost optimization for all your analytics and AI workloads.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 text-base">
                                    <Layers className="size-4" />
                                    Data Integration
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>Seamless data integration connecting disparate systems with real-time data flows. ETL/ELT pipelines, real-time streaming, API integration, and data transformation to ensure data consistency across your enterprise.</AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
                        <div className="aspect-4/3 bg-background relative w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeItem}-id`}
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="size-full overflow-hidden bg-zinc-900 shadow-md">
                                    <Image
                                        src={images[activeItem].image}
                                        className="size-full object-cover object-center dark:mix-blend-lighten"
                                        alt={images[activeItem].alt}
                                        width={1207}
                                        height={929}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <BorderBeam duration={15} size={250} borderWidth={1.5} />
                    </div>
                </div>
            </div>
        </section>
    )
}
