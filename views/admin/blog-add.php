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
                <div class="intro-y overflow-auto lg:overflow-visible mt-2">
                    <div class="grid grid-cols-12 gap-6">
                        <!-- BEGIN: Profile Menu -->
                        <div class="md:col-start-3 lg:col-start-4 col-span-12 md:col-span-8 lg:col-span-6">
                            <!-- BEGIN: Personal Information -->
                            <div class="intro-y box lg:mt-5">
                                <div class="flex items-center p-5 border-b border-red2 dark:border-darkmode-400">
                                    <h2 class="font-medium text-base mr-auto">
                                        Add New Blog
                                    </h2>
                                </div>
                                <div class="p-5">
                                    <div class="flex justify-center">
                                        <div class="w-80 mx-auto">
                                            <div
                                                class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                                <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                                    <img class="rounded-md" alt="Midone - HTML Admin Template"
                                                        src="dist/images/profile-15.jpg">
                                                    <div title="Remove this profile photo?"
                                                        class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
                                                        <i data-lucide="x" class="w-4 h-4"></i>
                                                    </div>
                                                </div>
                                                <div class="mx-auto cursor-pointer relative mt-5">
                                                    <button type="button" class="btn btn-primary w-full">Change
                                                        Photo</button>
                                                    <input type="file"
                                                        class="w-full h-full top-0 left-0 absolute opacity-0">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <label for="update-profile-form-11" class="form-label">Title</label>
                                        <input id="update-profile-form-11" type="text" class="form-control"
                                            placeholder="Title" value="">
                                    </div>
                                    <div class="mt-3">
                                        <label for="update-profile-form-5" class="form-label">Story</label>
                                        <textarea rows="5" id="update-profile-form-5" class="form-control"
                                            placeholder="Story"></textarea>
                                    </div>
                                </div>
                            </div>
                            <!-- END: Personal Information -->
                        </div>
                        <!-- END: Profile Menu -->
                    </div>
                    <div class="flex justify-center">
                        <button type="button" class="btn btn-primary mt-3">Add Blog</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- END: Content -->
    <?php include("includes/js-assets.php") ?>
</body>

</html>