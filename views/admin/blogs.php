<!DOCTYPE html>
<html lang="en" class="light" id="important">
<!-- BEGIN: Head -->

<head>
    <?php include("includes/head-assets.php") ?>
</head>
<!-- END: Head -->

<body class="py-5">

    <!-- Start Preloader Area -->
    <?php include("includes/preloader.php") ?>
    <!-- End Preloader Area -->

    <?php include("includes/navigation.php") ?>
    <!-- BEGIN: Content -->
    <div class="content">
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 mt-6">
                <div class="intro-y block sm:flex items-center h-10">
                    <h2 class="text-lg font-medium truncate mr-5">
                        Blogs
                    </h2>
                    <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
                        <a href="blog-add.php" class="btn btn-primary shadow-md mr-2">Add New Blog</a>
                    </div>
                </div>
                <div class="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-2 border-t-2 border-primary">
                    <div class="intro-y grid grid-cols-12 gap-6 mt-5">
                        <!-- BEGIN: Blog Layout -->
                        <div class="intro-y col-span-12 md:col-span-6 xl:col-span-4 box">
                            <div class="p-5">
                                <div class="h-40 2xl:h-56 image-fit">
                                    <img alt="Midone - HTML Admin Template" class="rounded-md"
                                        src="dist/images/preview-15.jpg">
                                </div>
                                <div class="flex justify-between items-center">

                                    <a href="" class="block font-medium text-base mt-5">200 Latin words, combined with a
                                        handful
                                        of model sentences</a>
                                    <div class="dropdown flex items-center" data-tw-placement="left">
                                        <a href="javascript:;" class="dropdown-toggle" aria-expanded="false"
                                            data-tw-toggle="dropdown">
                                            <i data-lucide="more-vertical" class="block mx-auto"></i>
                                        </a>
                                        <div class="dropdown-menu w-48">
                                            <ul class="dropdown-content border">
                                                <li> <a href="" class="dropdown-item"> <i data-lucide="edit"
                                                            class="w-4 h-4 mr-2"></i> Edit</a> </li>
                                                <li> <a href="javascript:;" class="dropdown-item"> <i
                                                            data-lucide="slash" class="w-4 h-4 mr-2"></i> Disable</a>
                                                </li>
                                                <li class="text-danger"> <a href="javascript:;" class="dropdown-item"
                                                        data-tw-toggle="modal" data-tw-target="#deleteModal">
                                                        <i data-lucide="trash" class="w-4 h-4 mr-2"></i> Delete</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-slate-600 dark:text-slate-500 mt-2">There are many variations of
                                    passages
                                    of Lorem Ipsum available, but the majority have suffered alteration in some form, by
                                    injected humour, or randomi</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
                    <nav class="w-full sm:w-auto sm:mr-auto">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        icon-name="chevrons-left" class="lucide lucide-chevrons-left w-4 h-4"
                                        data-lucide="chevrons-left">
                                        <polyline points="11 17 6 12 11 7"></polyline>
                                        <polyline points="18 17 13 12 18 7"></polyline>
                                    </svg> </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        icon-name="chevron-left" class="lucide lucide-chevron-left w-4 h-4"
                                        data-lucide="chevron-left">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg> </a>
                            </li>
                            <li class="page-item"> <a class="page-link" href="#">...</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">1</a> </li>
                            <li class="page-item active"> <a class="page-link" href="#">2</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">3</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">...</a> </li>
                            <li class="page-item">
                                <a class="page-link" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        icon-name="chevron-right" class="lucide lucide-chevron-right w-4 h-4"
                                        data-lucide="chevron-right">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg> </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        icon-name="chevrons-right" class="lucide lucide-chevrons-right w-4 h-4"
                                        data-lucide="chevrons-right">
                                        <polyline points="13 17 18 12 13 7"></polyline>
                                        <polyline points="6 17 11 12 6 7"></polyline>
                                    </svg> </a>
                            </li>
                        </ul>
                    </nav>
                    <select class="w-20 form-select box mt-3 sm:mt-0">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Content -->
    <?php include("includes/delete-modal.php") ?>
    <?php include("includes/js-assets.php") ?>
</body>

</html>