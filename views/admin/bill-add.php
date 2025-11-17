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
        <div class="grid grid-cols-11 gap-6">
            <div class="lg:col-start-2 col-span-11 lg:col-span-9 flex lg:block flex-col mt-6">
                <div class="intro-y overflow-auto lg:overflow-visible mt-2">
                    <!-- BEGIN: Personal Information -->
                    <div class="intro-y box lg:mt-5">

                        <div class="flex items-center p-5 border-b border-red2 dark:border-darkmode-400">
                            <h2 class="font-medium text-base mr-auto">
                                Add New Bill
                            </h2>
                        </div>
                        <div class="p-5">
                            <div class="flex xl:flex-row flex-col">
                                <div class="flex-1">
                                    <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label for="update-profile-form-11" class="form-label">Service
                                                Provider</label>
                                            <input id="update-profile-form-11" type="number" class="form-control"
                                                placeholder="Service Provider" value="">
                                        </div>
                                        <diV>
                                            <label for="update-profile-form-11" class="form-label">Packages</label>
                                            <select id="update-profile-form-8" class="form-select">
                                                <option value="same">1</option>
                                                <option value="others">2</option>
                                                <option value="crypto">3</option>
                                                <option value="paypal">4</option>
                                                <option value="cashApp">5</option>
                                            </select>
                                        </diV>
                                        <div class="flex gap-1">
                                            <div class="flex-1">
                                                <label for="update-profile-form-11" class="form-label">Package 1
                                                    Title</label>
                                                <input id="update-profile-form-11" type="text" class="form-control"
                                                    placeholder="Package 1 Title" value="">
                                            </div>
                                            <div class="flex-1">
                                                <label for="update-profile-form-11" class="form-label">Package 1
                                                    Amount</label>
                                                <input id="update-profile-form-11" type="number" class="form-control"
                                                    placeholder="Package 1 Amount" value="">
                                            </div>
                                        </div>
                                        <div>
                                            <label for="update-profile-form-8" class="form-label">Status</label>
                                            <select id="update-profile-form-8" class="form-select">
                                                <option value="same">
                                                    Available</option>
                                                <option value="others">Unavailable</option>
                                                <!-- <option value="crypto">Cancelled</option> -->
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
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
                                            <input type="file" class="w-full h-full top-0 left-0 absolute opacity-0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button type="button" class="btn btn-primary mt-3">Add Bill</button>
                    </div>
                    <!-- END: Personal Information -->
                </div>
            </div>
        </div>
    </div>
    <!-- END: Content -->
    <?php include("includes/js-assets.php") ?>
</body>

</html>