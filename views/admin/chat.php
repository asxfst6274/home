<!DOCTYPE html>
<html lang="en" class="light" id="important" id="important">
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
                <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
                    <!-- BEGIN: Chat Side Menu -->
                    <div id="chatSideMenu" class="col-span-12 lg:col-span-4 2xl:col-span-3">
                        <div class="tab-content h-full">
                            <div id="chats" class="tab-pane active h-full" role="tabpanel" aria-labelledby="chats-tab">
                                <div class="pr-1">
                                    <div class="box px-5 pt-5 pb-5">
                                        <div class="relative text-slate-500">
                                            <input type="text"
                                                class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                                                placeholder="Search for users...">
                                            <i class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                                                data-lucide="search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4">
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 ">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-6.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Johnny Depp</a>
                                                <div class="text-xs text-slate-400 ml-auto">05:09 AM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">There are many variations
                                                of passages of Lorem Ipsum available, but the majority have suffered
                                                alteration in some form, by injected humour, or randomi</div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            6</div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-14.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Sylvester Stallone</a>
                                                <div class="text-xs text-slate-400 ml-auto">03:20 PM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">Contrary to popular
                                                belief, Lorem Ipsum is not simply random text. It has roots in a piece
                                                of classical Latin literature from 45 BC, making it over 20</div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            3</div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-8.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Hugh Jackman</a>
                                                <div class="text-xs text-slate-400 ml-auto">01:10 PM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">It is a long established
                                                fact that a reader will be distracted by the readable content of a page
                                                when looking at its layout. The point of using Lorem </div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            4</div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-13.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Al Pacino</a>
                                                <div class="text-xs text-slate-400 ml-auto">05:09 AM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply
                                                dummy text of the printing and typesetting industry. Lorem Ipsum has
                                                been the industry&#039;s standard dummy text ever since the 1500</div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            4</div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-15.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Johnny Depp</a>
                                                <div class="text-xs text-slate-400 ml-auto">05:09 AM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">Contrary to popular
                                                belief, Lorem Ipsum is not simply random text. It has roots in a piece
                                                of classical Latin literature from 45 BC, making it over 20</div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            2</div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-5.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Johnny Depp</a>
                                                <div class="text-xs text-slate-400 ml-auto">05:09 AM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply
                                                dummy text of the printing and typesetting industry. Lorem Ipsum has
                                                been the industry&#039;s standard dummy text ever since the 1500</div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            6</div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-12.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">John Travolta</a>
                                                <div class="text-xs text-slate-400 ml-auto">01:10 PM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">There are many variations
                                                of passages of Lorem Ipsum available, but the majority have suffered
                                                alteration in some form, by injected humour, or randomi</div>
                                        </div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-6.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Denzel Washington</a>
                                                <div class="text-xs text-slate-400 ml-auto">01:10 PM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply
                                                dummy text of the printing and typesetting industry. Lorem Ipsum has
                                                been the industry&#039;s standard dummy text ever since the 1500</div>
                                        </div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-8.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Denzel Washington</a>
                                                <div class="text-xs text-slate-400 ml-auto">01:10 PM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">Contrary to popular
                                                belief, Lorem Ipsum is not simply random text. It has roots in a piece
                                                of classical Latin literature from 45 BC, making it over 20</div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            5</div>
                                    </div>
                                    <div
                                        class="userChatItem intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-3.jpg">
                                            <div
                                                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div class="ml-2 overflow-hidden">
                                            <div class="flex items-center">
                                                <a href="javascript:;" class="font-medium">Sylvester Stallone</a>
                                                <div class="text-xs text-slate-400 ml-auto">05:09 AM</div>
                                            </div>
                                            <div class="w-full truncate text-slate-500 mt-0.5">Contrary to popular
                                                belief, Lorem Ipsum is not simply random text. It has roots in a piece
                                                of classical Latin literature from 45 BC, making it over 20</div>
                                        </div>
                                        <div
                                            class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1">
                                            2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END: Chat Side Menu -->
                    <!-- BEGIN: Chat Content -->
                    <div id="chatContent" class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
                        <div class="chat__box box">
                            <!-- BEGIN: Chat Active -->
                            <div class="hidden h-full flex flex-col">
                                <div
                                    class="flex flex-col sm:flex-row border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4">
                                    <div class="flex items-center">
                                        <div id="goChatSideMenu" class="mr-3 hidden">
                                            <a href="javascript:;" class="w-5 h-5 text-slate-500 p-3"> <i
                                                    data-lucide="corner-up-left" class="w-5 h-5"></i> </a>
                                        </div>
                                        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-6.jpg">
                                        </div>
                                        <div class="ml-3 mr-auto">
                                            <div class="font-medium text-base">Johnny Depp</div>
                                            <div class="text-slate-500 text-xs sm:text-sm">Hey, I am using chat <span
                                                    class="mx-1">•</span> Online</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                                    <div class="chat__box__text-box flex items-end float-left mb-4">
                                        <div class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-6.jpg">
                                        </div>
                                        <div
                                            class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md">
                                            Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                                            <div class="mt-1 text-xs text-slate-500">2 mins ago</div>
                                        </div>
                                        <div class="hidden sm:block dropdown ml-3 my-auto">
                                            <a href="javascript:;" class="dropdown-toggle w-4 h-4 text-slate-500"
                                                aria-expanded="false" data-tw-toggle="dropdown"> <i
                                                    data-lucide="more-vertical" class="w-4 h-4"></i> </a>
                                            <div class="dropdown-menu w-40">
                                                <ul class="dropdown-content">
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i
                                                                data-lucide="corner-up-left" class="w-4 h-4 mr-2"></i>
                                                            Reply </a>
                                                    </li>
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i data-lucide="trash"
                                                                class="w-4 h-4 mr-2"></i> Delete </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clear-both"></div>
                                    <div class="chat__box__text-box flex items-end float-right mb-4">
                                        <div class="hidden sm:block dropdown mr-3 my-auto">
                                            <a href="javascript:;" class="dropdown-toggle w-4 h-4 text-slate-500"
                                                aria-expanded="false" data-tw-toggle="dropdown"> <i
                                                    data-lucide="more-vertical" class="w-4 h-4"></i> </a>
                                            <div class="dropdown-menu w-40">
                                                <ul class="dropdown-content">
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i
                                                                data-lucide="corner-up-left" class="w-4 h-4 mr-2"></i>
                                                            Reply </a>
                                                    </li>
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i data-lucide="trash"
                                                                class="w-4 h-4 mr-2"></i> Delete </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md">
                                            Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                                            <div class="mt-1 text-xs text-white text-opacity-80">1 mins ago</div>
                                        </div>
                                        <div class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-14.jpg">
                                        </div>
                                    </div>
                                    <div class="clear-both"></div>
                                    <div class="chat__box__text-box flex items-end float-right mb-4">
                                        <div class="hidden sm:block dropdown mr-3 my-auto">
                                            <a href="javascript:;" class="dropdown-toggle w-4 h-4 text-slate-500"
                                                aria-expanded="false" data-tw-toggle="dropdown"> <i
                                                    data-lucide="more-vertical" class="w-4 h-4"></i> </a>
                                            <div class="dropdown-menu w-40">
                                                <ul class="dropdown-content">
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i
                                                                data-lucide="corner-up-left" class="w-4 h-4 mr-2"></i>
                                                            Reply </a>
                                                    </li>
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i data-lucide="trash"
                                                                class="w-4 h-4 mr-2"></i> Delete </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md">
                                            Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                                            <div class="mt-1 text-xs text-white text-opacity-80">59 secs ago</div>
                                        </div>
                                        <div class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-14.jpg">
                                        </div>
                                    </div>
                                    <div class="clear-both"></div>
                                    <div class="text-slate-400 dark:text-slate-500 text-xs text-center mb-10 mt-5">12
                                        June 2020</div>
                                    <div class="chat__box__text-box flex items-end float-left mb-4">
                                        <div class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-6.jpg">
                                        </div>
                                        <div
                                            class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md">
                                            Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                                            <div class="mt-1 text-xs text-slate-500">10 secs ago</div>
                                        </div>
                                        <div class="hidden sm:block dropdown ml-3 my-auto">
                                            <a href="javascript:;" class="dropdown-toggle w-4 h-4 text-slate-500"
                                                aria-expanded="false" data-tw-toggle="dropdown"> <i
                                                    data-lucide="more-vertical" class="w-4 h-4"></i> </a>
                                            <div class="dropdown-menu w-40">
                                                <ul class="dropdown-content">
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i
                                                                data-lucide="corner-up-left" class="w-4 h-4 mr-2"></i>
                                                            Reply </a>
                                                    </li>
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i data-lucide="trash"
                                                                class="w-4 h-4 mr-2"></i> Delete </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clear-both"></div>
                                    <div class="chat__box__text-box flex items-end float-right mb-4">
                                        <div class="hidden sm:block dropdown mr-3 my-auto">
                                            <a href="javascript:;" class="dropdown-toggle w-4 h-4 text-slate-500"
                                                aria-expanded="false" data-tw-toggle="dropdown"> <i
                                                    data-lucide="more-vertical" class="w-4 h-4"></i> </a>
                                            <div class="dropdown-menu w-40">
                                                <ul class="dropdown-content">
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i
                                                                data-lucide="corner-up-left" class="w-4 h-4 mr-2"></i>
                                                            Reply </a>
                                                    </li>
                                                    <li>
                                                        <a href="" class="dropdown-item"> <i data-lucide="trash"
                                                                class="w-4 h-4 mr-2"></i> Delete </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md">
                                            Lorem ipsum
                                            <div class="mt-1 text-xs text-white text-opacity-80">1 secs ago</div>
                                        </div>
                                        <div class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-14.jpg">
                                        </div>
                                    </div>
                                    <div class="clear-both"></div>
                                    <div class="chat__box__text-box flex items-end float-left mb-4">
                                        <div class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5">
                                            <img alt="Midone - HTML Admin Template" class="rounded-full"
                                                src="dist/images/profile-6.jpg">
                                        </div>
                                        <div
                                            class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md">
                                            Johnny Depp is typing
                                            <span class="typing-dots ml-1"> <span>.</span> <span>.</span> <span>.</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400">
                                    <textarea
                                        class="chat__box__input remove-custom form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
                                        rows="1" placeholder="Type your message..."></textarea>
                                    <a href="javascript:;"
                                        class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mr-5">
                                        <i data-lucide="send" class="w-4 h-4"></i> </a>
                                </div>
                            </div>
                            <!-- END: Chat Active -->
                            <!-- BEGIN: Chat Default -->
                            <div class="h-full flex items-center">
                                <div class="mx-auto text-center">
                                    <div class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto">
                                        <img alt="Midone - HTML Admin Template" src="dist/images/profile-6.jpg">
                                    </div>
                                    <div class="mt-3">
                                        <div class="font-medium">Hey, Johnny Depp!</div>
                                        <div class="text-slate-500 mt-1">Please select a chat to start messaging.</div>
                                    </div>
                                </div>
                            </div>
                            <!-- END: Chat Default -->
                        </div>
                    </div>
                    <!-- END: Chat Content -->
                </div>
            </div>
        </div>
    </div>
    <!-- END: Content -->
    <?php include("includes/js-assets.php") ?>
    <script src="dist/js/chat.js"></script>
</body>

</html>