import React from "react";
import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import { ArrowRight } from "lucide-react";

const InfoCard = ({
  icon: Icon,
  title,
  description,
  href,
  ctaText = "Learn More",
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flexGrow: 1,
          p: "16px",
          "&:last-child": { pb: "16px" },
        }}
      >
        {/* Icon — no background, just the icon */}
        {Icon && (
          <Box sx={{ mb: "4px" }}>
            <Icon size={20} color="#60a5fa" />
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            color: "text.primary",
            fontWeight: 600,
            fontSize: "0.9375rem",
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
            fontSize: "0.875rem",
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        {/* CTA */}
        {href && (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "text.primary",
              fontSize: "0.875rem",
              fontWeight: 500,
              mt: "8px",
              width: "fit-content",
              "&:hover": { color: "primary.main" },
            }}
          >
            {ctaText}
            <ArrowRight size={13} />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
