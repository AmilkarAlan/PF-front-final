import React from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { styled } from '@mui/material/styles';

const HeroBox = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("https://source.unsplash.com/random/1920x1080?electronic")',
  height: '50vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(0,0,0,0.5)'  // Combined hero and heroText styles
}));

const TeamMemberPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  textAlign: 'center'
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: 'auto'
}));

function AboutUsPage() {
  return (
    <div>
      <HeroBox>
        <Typography variant="h2">About Us</Typography>
      </HeroBox>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Our Mission
        </Typography>
        <Typography>
          Digital Life is your one-stop online shop for all things electronics. Founded in 2024, we are a dedicated team of tech enthusiasts with a passion for bringing the latest and greatest electronic gadgets to our customers worldwide.
          Our mission is to provide high-quality electronic products at competitive prices. We offer a wide range of products, from headphones and cell phones to drones and more. We believe in the power of technology to enhance our lives, and we strive to make the latest tech accessible to everyone.
    
          We prioritize customer satisfaction above all else. We understand the importance of reliable service and speedy delivery, and we work tirelessly to ensure your shopping experience with us is smooth and hassle-free. Our customer support team is always ready to assist you with any queries or concerns.
          

          We are constantly updating our inventory with the latest products and technologies, ensuring that our customers always have access to the cutting-edge electronics they desire. We also offer regular discounts and promotions, making it even more affordable to get your hands on the latest gadgets.

          Thank you for choosing Digital Life. We look forward to serving you and meeting all your electronic needs.
        </Typography>

        <Typography variant="h4" align="center" gutterBottom>
          Our History
        </Typography>
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Founded in 2010</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>First Product Launch in 2012</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Expanded to international markets in 2015</TimelineContent>
          </TimelineItem>
        </Timeline>

        <Typography variant="h4" align="center" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <TeamMemberPaper elevation={ 3 }>
              <LargeAvatar alt="Team Member" src="https://i.pravatar.cc/300" />
              <Typography>Jane Doe, CEO</Typography>
            </TeamMemberPaper>
          </Grid>
          {/* Additional team members */ }
        </Grid>

        <Typography variant="h4" align="center" gutterBottom>
          Our Values
        </Typography>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 12 } sm={ 4 }>
            <Typography align="center">Innovation</Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 4 }>
            <Typography align="center">Quality</Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 4 }>
            <Typography align="center">Customer Satisfaction</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AboutUsPage;
