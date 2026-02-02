"use client";

import { useTranslations } from "next-intl";

import { Link } from '@/i18n/routing';

type MemberRole = "founderCEO" | "aiEngineer" | "fullstackEngineer";

const MEMBER_CONFIG: Array<{
    name: string;
    roleKey: MemberRole;
    avatar: string;
    link: string;
}> = [
        {
            name: 'Daniel Pham',
            roleKey: 'founderCEO',
            avatar: '/teams/dien_pham.jpg',
            link: '#',
        },
        {
            name: 'Thanh Nguyen',
            roleKey: 'aiEngineer',
            avatar: '/teams/thanh_nguyen.jpg',
            link: '#',
        },
        {
            name: 'Dat Chau',
            roleKey: 'fullstackEngineer',
            avatar: '/teams/dat_chau.jpg',
            link: '#',
        },
        {
            name: 'Hung Pham',
            roleKey: 'aiEngineer',
            avatar: '/teams/hung_pham.jpg',
            link: '#',
        },
        {
            name: 'Chinh Pham',
            roleKey: 'fullstackEngineer',
            avatar: '/teams/chinh_pham.jpg',
            link: '#',
        },
        {
            name: 'Dat Le',
            roleKey: 'aiEngineer',
            avatar: '/teams/dat_le.jpg',
            link: '#',
        },
        {
            name: 'Cuong Le',
            roleKey: 'aiEngineer',
            avatar: '/teams/cuong_le.jpg',
            link: '#',
        },
        {
            name: 'Manh Duong',
            roleKey: 'aiEngineer',
            avatar: '/teams/manh_duong.jpg',
            link: '#',
        },
        {
            name: 'Khai Pham',
            roleKey: 'aiEngineer',
            avatar: '/teams/khai_pham.jpg',
            link: '#',
        },
    ];

const TeamSection = () => {
    const t = useTranslations("Contact.Team");

    const members = MEMBER_CONFIG.map((member) => ({
        ...member,
        role: t(`roles.${member.roleKey}`),
    }));

    return (
        <section className="w-full bg-gray-50 dark:bg-transparent py-16 sm:py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                        {t("badge")}
                    </span>
                    <h2 className="mt-3 text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                        {t("title")}
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("description")}
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                        <div key={index} className="group overflow-hidden">
                            <img
                                className="h-96 w-full rounded-2xl object-cover object-top transition-all duration-500 group-hover:h-[22.5rem] group-hover:rounded-xl"
                                src={member.avatar}
                                alt={member.name}
                                width="826"
                                height="1239"
                            />
                            <div className="px-2 pt-3 sm:pt-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base font-medium text-foreground transition-all duration-500 group-hover:tracking-wider">
                                        {member.name}
                                    </h3>
                                    <span className="text-xs text-muted-foreground">
                                        _0{index + 1}
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        {member.role}
                                    </span>
                                    <Link
                                        href={member.link}
                                        className="text-[#276df0] hover:text-[#276df0]/80 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        {t("linktree")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
