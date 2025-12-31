import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TiltCard from "@/components/ui/TiltCard";
import { useGetStudentCoursesQuery } from '@/redux/api/studentApi';
import { cashFormat } from '@/utils/cashFormat';

export default function Courses() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(9);

    // Debounce search query
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset to first page on search
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Build query parameters
    const queryParams = {
        search: debouncedSearch || undefined,
        page: currentPage,
        per_page: perPage,
    };

    // Fetch courses from API
    const { data, isLoading, error, isFetching, refetch } = useGetStudentCoursesQuery(queryParams);

    const courses = data?.data || [];
    // Pagination meta is at the root level of data, not nested
    const meta = {
        current_page: data?.current_page || 1,
        last_page: data?.last_page || 1,
        per_page: data?.per_page || perPage,
        total: data?.total || 0,
        from: data?.from || 0,
        to: data?.to || 0,
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2 font-['Bricolage_Grotesque']">
                        Courses
                    </h1>
                    <p className="text-gray-400">
                        Expand your skills with our premium collection.
                        {meta.total > 0 && ` (${meta.total} courses available)`}
                    </p>
                </div>

                <Button
                    onClick={refetch}
                    variant="outline"
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    disabled={isFetching}
                >
                    {isFetching ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Refreshing...
                        </>
                    ) : (
                        'Refresh'
                    )}
                </Button>
            </div>

            {/* Search Section */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search courses by title, description, or category..."
                        className="pl-10 bg-black/20 border-white/10 text-white focus:border-[#a6b1ff]/50 placeholder:text-gray-500 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center space-y-4">
                        <Loader2 className="w-12 h-12 animate-spin text-[#a6b1ff] mx-auto" />
                        <p className="text-gray-400">Loading courses...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center space-y-4 max-w-md">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-red-500 text-2xl">⚠️</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Failed to load courses</h3>
                        <p className="text-gray-400">
                            {error.message || 'An error occurred while fetching courses.'}
                        </p>
                        <Button
                            onClick={refetch}
                            className="bg-[#a6b1ff] text-[#0a0a0a] hover:bg-[#a6b1ff]/90"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && courses.length === 0 && (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                            <Search className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">No courses found</h3>
                        <p className="text-gray-400">
                            Try adjusting your filters or search query
                        </p>
                    </div>
                </div>
            )}

            {/* Courses Grid */}
            {!isLoading && !error && courses.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div key={course.id} onClick={() => navigate(`/courses/${course.id}`)} className="cursor-pointer">
                                <TiltCard>
                                    <Card className="h-full group bg-white/5 border-white/10 overflow-hidden backdrop-blur-sm hover:border-[#a6b1ff]/30">
                                        {/* Course Image */}
                                        <div className="relative aspect-video overflow-hidden transform-style-3d">
                                            <img
                                                src={course.banner_url || course.banner || course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"}
                                                alt={course.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 translate-z-10"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                                            <Badge className="absolute top-3 left-3 bg-[#a6b1ff]/90 text-[#0a0a0a] hover:bg-[#a6b1ff] border-none font-bold backdrop-blur-md shadow-lg translate-z-20">
                                                {course.category || 'General'}
                                            </Badge>
                                            {course.difficulty_level && (
                                                <Badge className="absolute top-3 right-3 bg-white/10 text-white border-white/20 backdrop-blur-md shadow-lg translate-z-20">
                                                    {course.difficulty_level}
                                                </Badge>
                                            )}
                                        </div>

                                        <CardContent className="p-5 space-y-4 transform-style-3d">
                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-[#a6b1ff] transition-colors translate-z-10">
                                                {course.title}
                                            </h3>

                                            {/* Description */}
                                            <div className='flex items-center justify-between gap-1'>
                                                {course.description && (
                                                    <p className="text-sm text-gray-400 line-clamp-2">
                                                        {course.description}
                                                    </p>
                                                )}

                                                {/* Always show rating, default to 5 stars */}
                                                <div className="flex items-center gap-1 text-[#ffb585]">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="font-bold">{course.rating || 5.0}</span>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="flex items-center justify-between text-sm text-gray-400 border-t border-white/5 pt-4">
                                                <div className="flex items-center gap-2">
                                                    {course.teacher_name && (
                                                        <>
                                                            <Avatar className="w-6 h-6 border border-white/10">
                                                                <AvatarImage src={course.teacher_avatar} />
                                                                <AvatarFallback>
                                                                    {course.teacher_name.substring(0, 2).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <span>{course.teacher_name}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="font-medium text-white">
                                                    {course.students_count || course.students || 0}
                                                </span>
                                                <span>students</span>
                                            </div>
                                            <span className="text-lg font-bold text-[#a6b1ff]">
                                                {course.amount ? `${cashFormat(course.amount)}` : 'Free'}
                                            </span>
                                        </CardFooter>
                                    </Card>
                                </TiltCard>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {meta.last_page > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            <div className="text-sm text-gray-400">
                                Showing {meta.from || 0} to {meta.to || 0} of {meta.total || 0} courses
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || isFetching}
                                    variant="outline"
                                    size="sm"
                                    className="bg-black/20 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </Button>

                                <div className="flex items-center gap-1">
                                    {[...Array(meta.last_page)].map((_, index) => {
                                        const page = index + 1;
                                        // Show first page, last page, current page, and pages around current
                                        if (
                                            page === 1 ||
                                            page === meta.last_page ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    disabled={isFetching}
                                                    variant={currentPage === page ? "default" : "outline"}
                                                    size="sm"
                                                    className={
                                                        currentPage === page
                                                            ? "bg-[#a6b1ff] text-[#0a0a0a] hover:bg-[#a6b1ff]/90"
                                                            : "bg-black/20 border-white/10 text-white hover:bg-white/10"
                                                    }
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                                            return <span key={page} className="text-gray-500 px-2">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <Button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage >= meta.last_page || isFetching}
                                    variant="outline"
                                    size="sm"
                                    className="bg-black/20 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
