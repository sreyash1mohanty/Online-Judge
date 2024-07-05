import React from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Divider, Link, ListItemIcon } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import YouTubeIcon from '@mui/icons-material/YouTube';
function Resources() {
    return (
        <Container maxWidth="md">
            <Box my={4} textAlign="center">
                <Typography variant="h3" component="h1" gutterBottom>
                    Get Coding Resources
                </Typography>
            </Box>
            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Competitive Programming
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CodeIcon />
                        </ListItemIcon>
                        <Link href="https://cses.fi/problemset/" target="_blank" rel="noopener">
                            <ListItemText primary="CSES Problemset" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CodeIcon />
                        </ListItemIcon>
                        <Link href="https://cp-algorithms.com/index.html" target="_blank" rel="noopener">
                            <ListItemText primary="CP Algorithms" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CodeIcon />
                        </ListItemIcon>
                        <Link href="https://earthshakira.github.io/a2oj-clientside/server/Ladders.html" target="_blank" rel="noopener">
                            <ListItemText primary="Problemset" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CodeIcon />
                        </ListItemIcon>
                        <Link href="https://usaco.guide/bronze/time-comp?lang=cpp" target="_blank" rel="noopener">
                            <ListItemText primary="USACO Guide" />
                        </Link>
                    </ListItem>
                </List>
            </Box>
            <Divider />
            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom>
                    YouTube Channels
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <YouTubeIcon />
                        </ListItemIcon>
                        <Link href="https://www.youtube.com/@TLE_Eliminators" target="_blank" rel="noopener">
                            <ListItemText primary="TLE Eliminators" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <YouTubeIcon />
                        </ListItemIcon>
                        <Link href="https://www.youtube.com/@takeUforward" target="_blank" rel="noopener">
                            <ListItemText primary="Take U Forward" />
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
}

export default Resources;