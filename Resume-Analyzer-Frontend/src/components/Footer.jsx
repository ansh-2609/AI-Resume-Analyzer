// // client/src/components/Footer.js
// import React from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Link,
//   IconButton,
//   Divider,
//   TextField,
//   Button
// } from '@mui/material';
// import {
//   Facebook,
//   Twitter,
//   LinkedIn,
//   GitHub,
//   Email,
//   LocationOn,
//   Phone,
//   Send
// } from '@mui/icons-material';

// function Footer() {
//   const quickLinks = [
//     { label: 'Home', href: '/' },
//     { label: 'How It Works', href: '/how-it-works' },
//     { label: 'Pricing', href: '/pricing' },
//     { label: 'About Us', href: '/about' },
//     { label: 'Contact', href: '/contact' },
//     { label: 'Privacy Policy', href: '/privacy' },
//   ];

//   const features = [
//     'AI Resume Analysis',
//     'Job Matching',
//     'Interview Preparation',
//     'Application Tracking',
//     'Skill Gap Analysis',
//     'Real-time Updates',
//   ];

//   const socialLinks = [
//     { icon: <Facebook />, label: 'Facebook', href: '#' },
//     { icon: <Twitter />, label: 'Twitter', href: '#' },
//     { icon: <LinkedIn />, label: 'LinkedIn', href: '#' },
//     { icon: <GitHub />, label: 'GitHub', href: '#' },
//   ];

//   return (
//     <Box
//       component="footer"
//       sx={{
//         backgroundColor: '#f8f9fa',
//         borderTop: '1px solid #e9ecef',
//         mt: 'auto',
//         py: 6
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* Company Info */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//               AI Resume Analyzer
//             </Typography>
//             <Typography variant="body2" color="text.secondary" paragraph>
//               We use artificial intelligence to help job seekers find the perfect career opportunities. 
//               Upload your resume, get matched with jobs, and ace your interviews.
//             </Typography>
            
//             <Box sx={{ mt: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
//                 <Typography variant="body2">123 Career Street, Job City, JC 12345</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <Phone sx={{ mr: 1, color: 'primary.main' }} />
//                 <Typography variant="body2">+1 (555) 123-4567</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Email sx={{ mr: 1, color: 'primary.main' }} />
//                 <Typography variant="body2">support@resumeanalyzer.com</Typography>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Quick Links */}
//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               Quick Links
//             </Typography>
//             <Box>
//               {quickLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   variant="body2"
//                   display="block"
//                   sx={{
//                     mb: 1,
//                     color: 'text.secondary',
//                     textDecoration: 'none',
//                     '&:hover': { color: 'primary.main' }
//                   }}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </Box>
//           </Grid>

//           {/* Features */}
//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               Features
//             </Typography>
//             <Box>
//               {features.map((feature) => (
//                 <Typography
//                   key={feature}
//                   variant="body2"
//                   sx={{
//                     mb: 1,
//                     color: 'text.secondary',
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}
//                 >
//                   • {feature}
//                 </Typography>
//               ))}
//             </Box>
//           </Grid>

//           {/* Newsletter & Social */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               Stay Updated
//             </Typography>
//             <Typography variant="body2" color="text.secondary" paragraph>
//               Subscribe to our newsletter for the latest job search tips and feature updates.
//             </Typography>
            
//             <Box component="form" sx={{ display: 'flex', mb: 3 }}>
//               <TextField
//                 variant="outlined"
//                 placeholder="Your email"
//                 size="small"
//                 fullWidth
//                 sx={{ mr: 1 }}
//               />
//               <Button
//                 variant="contained"
//                 endIcon={<Send />}
//                 sx={{ minWidth: 'auto' }}
//               >
//                 Subscribe
//               </Button>
//             </Box>

//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
//               Follow Us
//             </Typography>
//             <Box>
//               {socialLinks.map((social) => (
//                 <IconButton
//                   key={social.label}
//                   href={social.href}
//                   sx={{ 
//                     mr: 1,
//                     color: 'primary.main',
//                     '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
//                   }}
//                   aria-label={social.label}
//                 >
//                   {social.icon}
//                 </IconButton>
//               ))}
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="body2" color="text.secondary">
//             © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
//           </Typography>
          
//           <Box sx={{ mt: { xs: 2, sm: 0 } }}>
//             <Link href="/terms" variant="body2" color="text.secondary" sx={{ mr: 2 }}>
//               Terms of Service
//             </Link>
//             <Link href="/privacy" variant="body2" color="text.secondary" sx={{ mr: 2 }}>
//               Privacy Policy
//             </Link>
//             <Link href="/cookies" variant="body2" color="text.secondary">
//               Cookie Policy
//             </Link>
//           </Box>
//         </Box>

//         <Box sx={{ mt: 2, textAlign: 'center' }}>
//           <Typography variant="caption" color="text.secondary">
//             Made with ❤️ for job seekers everywhere
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default Footer;



// client/src/components/Footer.jsx
import React, { useState } from 'react';
import {useSelector} from 'react-redux';  
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');

  const isLoggedIn = useSelector((state) => state.auth.isloggedin);
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ];

  const features = [
    'AI Resume Analysis',
    'Job Matching',
    'Interview Preparation',
    'Application Tracking',
    'Skill Gap Analysis',
    'Real-time Updates',
  ];

  const socialLinks = [
    { icon: <FaFacebook className="h-5 w-5" />, label: 'Facebook', href: '#' },
    { icon: <FaTwitter className="h-5 w-5" />, label: 'Twitter', href: '#' },
    { icon: <FaLinkedin className="h-5 w-5" />, label: 'LinkedIn', href: '#' },
    { icon: <FaGithub className="h-5 w-5" />, label: 'GitHub', href: '#' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed:', email);
      setEmail('');
      // Add your subscription logic here
    }
  };

  // return (
  //   <footer className={`mt-auto bg-gray-50 border-t border-gray-200 ${
  //         isLoggedIn ? 'lg:pl-64' : ''
  //       }`}>
  //     <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
  //       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
  //         {/* Company Info */}
  //         <div>
  //           <div className="flex items-center space-x-2">
  //             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
  //               <BriefcaseIcon className="h-6 w-6 text-white" />
  //             </div>
  //             <h3 className="text-lg font-bold text-gray-900">AI Resume Analyzer</h3>
  //           </div>
  //           <p className="mt-4 text-sm text-gray-600">
  //             We use artificial intelligence to help job seekers find the perfect career opportunities. 
  //             Upload your resume, get matched with jobs, and ace your interviews.
  //           </p>
            
  //           <div className="mt-6 space-y-3">
  //             <div className="flex items-start">
  //               <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
  //               <span className="ml-3 text-sm text-gray-600">123 Career Street, Job City, JC 12345</span>
  //             </div>
  //             <div className="flex items-center">
  //               <PhoneIcon className="h-5 w-5 shrink-0 text-blue-600" />
  //               <span className="ml-3 text-sm text-gray-600">+1 (555) 123-4567</span>
  //             </div>
  //             <div className="flex items-center">
  //               <EnvelopeIcon className="h-5 w-5 shrink-0 text-blue-600" />
  //               <span className="ml-3 text-sm text-gray-600">support@resumeanalyzer.com</span>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Quick Links */}
  //         <div>
  //           <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
  //           <ul className="mt-4 space-y-2">
  //             {quickLinks.map((link) => (
  //               <li key={link.label}>
  //                 <a
  //                   href={link.href}
  //                   className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
  //                 >
  //                   {link.label}
  //                 </a>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>

  //         {/* Features */}
  //         <div>
  //           <h3 className="text-lg font-semibold text-gray-900">Features</h3>
  //           <ul className="mt-4 space-y-2">
  //             {features.map((feature) => (
  //               <li key={feature} className="flex items-center">
  //                 <span className="mr-2 text-blue-600">•</span>
  //                 <span className="text-sm text-gray-600">{feature}</span>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>

  //         {/* Newsletter & Social */}
  //         <div>
  //           <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
  //           <p className="mt-4 text-sm text-gray-600">
  //             Subscribe to our newsletter for the latest job search tips and feature updates.
  //           </p>
            
  //           <form onSubmit={handleSubscribe} className="mt-4">
  //             <div className="flex">
  //               <input
  //                 type="email"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 placeholder="Your email"
  //                 className="flex-1 rounded-l-lg border border-r-0 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                 required
  //               />
  //               <button
  //                 type="submit"
  //                 className="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  //               >
  //                 <PaperAirplaneIcon className="h-5 w-5" />
  //               </button>
  //             </div>
  //           </form>

  //           <div className="mt-8">
  //             <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
  //             <div className="mt-4 flex space-x-4">
  //               {socialLinks.map((social) => (
  //                 <a
  //                   key={social.label}
  //                   href={social.href}
  //                   className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
  //                   aria-label={social.label}
  //                 >
  //                   {social.icon}
  //                 </a>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="mt-8 border-t border-gray-200 pt-8">
  //         <div className="flex flex-col items-center justify-between md:flex-row">
  //           <p className="text-sm text-gray-600">
  //             © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
  //           </p>
            
  //           <div className="mt-4 flex space-x-6 md:mt-0">
  //             <a href="/terms" className="text-sm text-gray-600 hover:text-blue-600 hover:underline">
  //               Terms of Service
  //             </a>
  //             <a href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 hover:underline">
  //               Privacy Policy
  //             </a>
  //             <a href="/cookies" className="text-sm text-gray-600 hover:text-blue-600 hover:underline">
  //               Cookie Policy
  //             </a>
  //           </div>
  //         </div>
          
  //         <div className="mt-4 text-center">
  //           <p className="text-sm text-gray-500">
  //             Made with ❤️ for job seekers everywhere
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </footer>
  // );
  return (
  <footer
    className={`mt-auto border-t ${
      isLoggedIn ? "lg:pl-64" : ""
    } ${
      isDark
        ? "bg-gray-900 border-gray-700 text-gray-300"
        : "bg-gray-50 border-gray-200 text-gray-900"
    }`}
  >
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-150 md:grid-cols-2 lg:grid-cols-2">

        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <BriefcaseIcon className="h-6 w-6 text-white" />
            </div>
            <h3
              className={`text-lg font-bold ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              AI Resume Analyzer
            </h3>
          </div>

          <p
            className={`mt-4 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We use artificial intelligence to help job seekers find the perfect
            career opportunities. Upload your resume, get matched with jobs,
            and ace your interviews.
          </p>

          <div className="mt-6 space-y-3">
            {/* <div className="flex items-start">
              <MapPinIcon className="mt-0.5 h-5 w-5 text-blue-600" />
              <span
                className={`ml-3 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                123 Career Street, Job City, JC 12345
              </span>
            </div> */}
            {/* <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 text-blue-600" />
              <span
                className={`ml-3 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                +1 (555) 123-4567
              </span>
            </div> */}
            {/* <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-blue-600" />
              <span
                className={`ml-3 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                support@resumeanalyzer.com
              </span>
            </div> */}
          </div>
        </div>

        {/* Quick Links */}
        {/* <div>
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm hover:underline ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Features */}
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Features
          </h3>
          <ul className="mt-4 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center">
                <span className="mr-2 text-blue-600">•</span>
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Social */}
        {/* <div>
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Stay Updated
          </h3>

          <p
            className={`mt-4 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Subscribe to our newsletter for the latest job search tips and
            feature updates.
          </p>

          <form onSubmit={handleSubscribe} className="mt-4">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`flex-1 rounded-l-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
              <button
                type="submit"
                className="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`rounded-full p-2 transition-colors ${
                    isDark
                      ? "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white"
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div> */}
      </div>

      <div
        className={`mt-8 border-t pt-8 ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col items-center justify-between md:flex-col md:items-center gap-4">
          <p
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
          </p>

          <p
            className={`text-sm ${
              isDark ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Made with ❤️ for job seekers everywhere
          </p>

          {/* <div className="mt-4 flex space-x-6 md:mt-0">
            {["Terms", "Privacy", "Cookies"].map((label) => (
              <a
                key={label}
                href={`/${label.toLowerCase()}`}
                className={`text-sm hover:underline ${
                  isDark
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {label} Policy
              </a>
            ))}
          </div> */}
        </div>

        <div className="mt-4 text-center">
          
        </div>
      </div>
    </div>
  </footer>
);

  
// return (
//   <footer
//     className={`mt-auto
//       bg-gray-50 dark:bg-gray-900
//       border-t border-gray-200 dark:border-gray-700
//       text-gray-900 dark:text-gray-100
//       ${isLoggedIn ? 'lg:pl-64' : ''}
//     `}
//   >
//     <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        
//         {/* Company Info */}
//         <div>
//           <div className="flex items-center space-x-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
//               <BriefcaseIcon className="h-6 w-6 text-white" />
//             </div>
//             <h3 className="text-lg font-bold">
//               AI Resume Analyzer
//             </h3>
//           </div>

//           <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
//             We use artificial intelligence to help job seekers find the perfect career opportunities.
//             Upload your resume, get matched with jobs, and ace your interviews.
//           </p>

//           <div className="mt-6 space-y-3">
//             <div className="flex items-start">
//               <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
//               <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
//                 123 Career Street, Job City, JC 12345
//               </span>
//             </div>

//             <div className="flex items-center">
//               <PhoneIcon className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
//               <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
//                 +1 (555) 123-4567
//               </span>
//             </div>

//             <div className="flex items-center">
//               <EnvelopeIcon className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
//               <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
//                 support@resumeanalyzer.com
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold">
//             Quick Links
//           </h3>
//           <ul className="mt-4 space-y-2">
//             {quickLinks.map((link) => (
//               <li key={link.label}>
//                 <a
//                   href={link.href}
//                   className="text-sm text-gray-600 dark:text-gray-400
//                     hover:text-blue-600 dark:hover:text-blue-400
//                     hover:underline"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Features */}
//         <div>
//           <h3 className="text-lg font-semibold">
//             Features
//           </h3>
//           <ul className="mt-4 space-y-2">
//             {features.map((feature) => (
//               <li key={feature} className="flex items-center">
//                 <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   {feature}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Newsletter & Social */}
//         <div>
//           <h3 className="text-lg font-semibold">
//             Stay Updated
//           </h3>
//           <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
//             Subscribe to our newsletter for the latest job search tips and feature updates.
//           </p>

//           <form onSubmit={handleSubscribe} className="mt-4">
//             <div className="flex">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your email"
//                 className="flex-1 rounded-l-lg border border-r-0
//                   border-gray-300 dark:border-gray-600
//                   bg-white dark:bg-gray-800
//                   px-4 py-2 text-sm
//                   text-gray-900 dark:text-gray-100
//                   placeholder-gray-400
//                   focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="rounded-r-lg bg-blue-600 hover:bg-blue-700
//                   px-4 py-2 text-white
//                   focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <PaperAirplaneIcon className="h-5 w-5" />
//               </button>
//             </div>
//           </form>

//           <div className="mt-8">
//             <h3 className="text-lg font-semibold">
//               Follow Us
//             </h3>
//             <div className="mt-4 flex space-x-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="rounded-full
//                     bg-gray-200 dark:bg-gray-700
//                     p-2 text-gray-600 dark:text-gray-300
//                     hover:bg-blue-600 hover:text-white
//                     transition-colors duration-200"
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom */}
//       <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
//         <div className="flex flex-col items-center justify-between md:flex-row">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
//           </p>

//           <div className="mt-4 flex space-x-6 md:mt-0">
//             {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="text-sm text-gray-600 dark:text-gray-400
//                   hover:text-blue-600 dark:hover:text-blue-400
//                   hover:underline"
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Made with ❤️ for job seekers everywhere
//           </p>
//         </div>
//       </div>
//     </div>
//   </footer>
// );

}

export default Footer;