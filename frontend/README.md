# Mohamed Arap Portfolio Website

A modern, professional portfolio website showcasing web development, graphic design, and video editing services.

## Features

- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Portfolio Gallery**: Filterable project showcase
- **Contact Form**: Integrated with WhatsApp Business API
- **Admin Dashboard**: Protected admin area to view contact submissions
- **CV Download**: Downloadable resume/CV functionality

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Simple cookie-based auth
- **API Integration**: WhatsApp Business API

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# WhatsApp Business API Configuration
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
RECIPIENT_PHONE_NUMBER=your_recipient_number

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
\`\`\`

## WhatsApp Business API Setup

1. Create a Meta Business Account at [business.facebook.com](https://business.facebook.com)
2. Set up WhatsApp Business API through Meta for Developers
3. Get your Phone Number ID and Access Token
4. Add the environment variables to your project

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

- Login URL: `/login`
- Default credentials: `admin` / `admin123` (change in production!)
- Admin dashboard: `/admin`

## Customization

### Update Personal Information

Edit the following files to customize with your information:

- `components/hero-section.tsx` - Name and introduction
- `components/about-section.tsx` - Education and skills
- `components/services-section.tsx` - Services offered
- `components/portfolio-section.tsx` - Portfolio projects
- `components/experience-section.tsx` - Work experience
- `components/contact-section.tsx` - Contact information

### Add Your CV

Place your CV file at `public/cv/mohamed-arap-cv.pdf` or update the path in `components/navigation.tsx`

### Update Social Links

Edit social media links in:
- `components/hero-section.tsx`
- `components/footer.tsx`

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to add all environment variables in your Vercel project settings.

## License

MIT License - feel free to use this template for your own portfolio!
